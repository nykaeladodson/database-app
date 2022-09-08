import express from 'express';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import pgp from 'pg-promise';
dotenv.config();

const app = express();
app.use(express.json());

const db = pgp()({
  user: process.env.POSTGRES_USERNAME,
  port: 5432,
  database: 'pet',
  host: 'localhost',
  password: process.env.POSTGRES_PASSWORD,
});

let connectionString = process.env.MONGO_URI;

let mdb
const init = async () => {
  try {
    mdb = await mongodb.MongoClient.connect(
      connectionString,
      function(err, client) {
        mdb = client.db()
      });
    console.log('connection successful')
  } catch (error) {
    console.log(error);
  }
};

app.get('/', (request, response) => {
  response.send("hello world")
});

app.get('/pets/dogs', (request, response) => {
  db.any('SELECT name FROM dogs;')
    .then(data => response.json(data));
});

app.get('/pets/cat', async (request, response) => {
  console.log(mdb)
  const allCats =  await mdb.collection('cats').find();
  return response.send(allCats);
});

(async() => {
  await init();

  app.listen(3001, () => {
    console.log('app is listening on port 3001');
  })
})();



