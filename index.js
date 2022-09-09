const express = require('express')
const app = express()
const pgp = require('pg-promise')()
const mongoose = require('mongoose')
const Cat = require('./setup_mongo.js')
require('dotenv').config()

app.use(express.json());

const postgresDB = pgp({
  user: process.env.POSTGRES_USERNAME,
  port: 5432,
  database: 'pet',
  host: 'localhost'
})

const mongoDBURI = process.env.MONGO_URI
mongoose.connect(mongoDBURI, {useNewUrlParser: true, useUnifiedTopology: true});
const mongoDB = mongoose.connection;
mongoDB.on('error', (error) => console.log('mongo connection error'))
mongoDB.once('connected', () => console.log('Mongo connected'))

app.get('/', (request, response) => {
  response.send("hello world!!")
})

app.get('/pets/dogs', (request, response) => {
  postgresDB.any('SELECT name FROM dogs;')
    .then(data => response.json(data))
})

app.get('/pets/cats', async (request, response) => {
  try {
    const data = await Cat.find();
    response.json(data)
  } catch(error) {
    response.status(500).json({message: error.message})
  }
})

app.listen(3001, () => {
  console.log('App running on port 3001')
})



