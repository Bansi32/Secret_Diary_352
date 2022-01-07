if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const app = express();
//require("./src/db/connect"); //connect db
const userRouter = require("./src/routers/users");
const methodOverride = require('method-override');
const ExpressError = require('./src/utils/ExpressError');
const notes = require('./src/routers/notes');
const passport = require('passport');
const localStrategy = require('passport-local');
const user  = require('./src/models/register');
const session = require('express-session');
const flash = require('connect-flash');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/secretdiary";
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

mongoose.connect(dbUrl)
    .then(() => {
    console.log(`connect successful`);
}).catch((e) => {
    console.log(e);
});

//environmental port to be used as per availability
const Port = process.env.PORT || 3000; 

//set view engine
app.set('view engine', 'ejs');

// join path... views directory is must for ejs files
app.set('views', path.join(__dirname, '/src/views')); 
app.use(express.static("src/assets")); 
app.use(express.static("src/bootstrap"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(mongoSanitize({replaceWith:'_'}));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: process.env.SECRET
    }
});

store.on("error", function (e) {
    console.log("Session Store Error",e);
});


const sessionConfig = {
    store,
    name:'session',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge:1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com",
    "https://api.tiles.mapbox.com",
    "https://api.mapbox.com",
    "https://kit.fontawesome.com",
    "https://cdnjs.cloudflare.com",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com",
    "https://stackpath.bootstrapcdn.com",
    "https://api.mapbox.com",
    "https://api.tiles.mapbox.com",
    "https://fonts.googleapis.com",
    "https://use.fontawesome.com",
];
const connectSrcUrls = [
    "https://api.mapbox.com",
    "https://*.tiles.mapbox.com",
    "https://events.mapbox.com",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            childSrc: ["blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/douqbebwk/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
    res.locals.loginUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


//express router
app.use(userRouter);
app.use('/notes',notes);

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/about", (req, res) => {
    res.render("about");
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});



app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message)
    {
        err.message = 'Ops Something Went Wrong!';
    }
    res.status(statusCode).render('error', { err });
});


app.listen(Port, () => {
    console.log(`Server is conected to ${Port}`);    
});
