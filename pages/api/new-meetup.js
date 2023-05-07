// /api/new-meetup
import { MongoClient } from 'mongodb'

// name is up to you, usually is named handler
async function handler(req, res) {
  if (req.method == 'POST') {
    const data = req.body;

    // the name of the db is "meetups"
    const client = await MongoClient.connect("mongodb+srv://Cristian:T5ykxDSjBnpBKJPN@cluster0.rxv84.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();

    const meetupsCollection = db.collection('meetups'); // can also be  another name than the db name

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;