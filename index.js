const express = require('express')
const app = express()
const pgp = require('pg-promise')()
const db = pgp({
  user: 'nykaeladodson',
  port: 5432,
  database: 'pet',
  host: 'localhost'
})

app.get('/', (request, response) => {
  response.send("hello world")
})

app.get('/pets/dogs', (request, response) => {
  db.any('SELECT name FROM dogs;')
    .then(data => response.json(data))
})

app.get('/pets/cats', (request, response) => {
  // put mongodb database here 
})

app.listen(3001, () => {
  console.log('App running on port 3001')
})