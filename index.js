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
  const productCollection = client.db("phishing").collection("logIn");

  // app.get("/product", (req, res) => {
  //   productCollection.find()
  //   .toArray((err, product) => {
  //     res.send(product)
  //     console.log('from database', product)
  //   })
  // })

  app.post('/addUser', (req, res) => {
    const logIn = req.body;
    console.log('adding new Product:', logIn)

    productCollection.insertOne(logIn)
      .then(result => {
        console.log('user', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })

  // app.delete('/deleteProduct/:id', (req, res) => {

    // productCollection.findOneAndDelete({_id: ObjectID(req.params.id)})
    // .then( result => {
    //   console.log(result)
  //   // })

  //   const id = ObjectID(req.params.id);
  //   productCollection.findOneAndDelete({_id:id})
  //   .then(document => res.send(!!document.value))
  // })

  // client.close();
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})