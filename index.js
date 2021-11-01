const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kp6pq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
      await client.connect();
      const database = client.db("travellingBD");
      const bookingCollection = database.collection("booking");
      const servicesCollection = database.collection("services");


        // GET API
        app.get('/booking', async (req, res) => {
            const cursor = bookingCollection.find({})
            const bookings = await cursor.toArray();
            res.send(bookings);
        });


        // GET API 2
        app.get('/services', async (req, res) => {
            const cursor = bookingCollection.find({})
            const services = await cursor.toArray();
            res.send(services);
        });




        // GET SINGLE API
        app.get('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const booking = await bookingCollection.findOne(query);
            res.json(booking);
        });





        // POST API
        app.post('/booking', async (req, res) => {

            const booking = req.body;
            console.log('hit the post api', booking)
            
            const result = await bookingCollection.insertOne(booking);
            console.log(result);
            res.json(result)

        });



        // POST API 2
        app.post('/services', async (req, res) => {

            const services = req.body;
            console.log('hit the post api 2', services);
            const result = await servicesCollection.insertOne(services);
            console.log(result);
            res.json(result)

        });



        // DELETE API
        app.delete('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await bookingCollection.deleteOne(query);
            res.json(service);
        })

      
    } 
    finally {
    //   await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
