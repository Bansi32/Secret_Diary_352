
# Secret_Diary_352

To start this app run `npm install` to download node_modules



## API Reference

#### Get home page (index page)

```//000 http
  GET /
```

#### Get login or register form

```//000 http
  GET /login or /register
```
#### It will show all the notes of user if user is registerd

```//000 http
  GET /notes
```

#### It will help to add new notes

```//000 http
  GET /notes/add
```
#### It will help to see a particular note (notes id)

```//000http
  GET /notes/:id 
```
#### It will help to edit a particular note by user

```//000http
  GET /notes/:id/edit
```
#### It will help to delete a particular note by user

```//000 http
  GET /notes/:id/delete
```
#### It will logout a user

```//000http
  GET /logout
```
