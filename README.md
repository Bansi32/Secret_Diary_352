
# Secret_Diary_352

To start this app run `npm install` to download node_modules



## API Reference

#### Get home page (index page)

```http
  GET /
```

#### Get login or register form

```http
  GET /login or /register
```
#### It will show all the notes of user if user is registerd

```http
  GET /notes
```

#### It will help to add new notes

```http
  GET /notes/add
```
#### It will help to see a particular note (notes id)

```http
  GET /notes/:id 
```
#### It will help to edit a particular note by user

```http
  GET /notes/:id/edit
```
#### It will help to delete a particular note by user

```http
  GET /notes/:id/delete
```
#### It will logout a user

```http
  GET /logout
```
