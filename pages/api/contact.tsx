import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import INewMessage from '../interfaces/IContact';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email
      || !email.includes('@')
      || !name
      || name.trim() === ''
      || !message
      || message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage: INewMessage = {
      email,
      name,
      message,
    };

    let client: MongoClient;

    const connectionString = `mongodb+srv://${process.env.MDB_USERNAME}:${process.env.MDB_PASSWORD}`
      + `@${process.env.MDB_CLUSTERNAME}.8yvqjg9.mongodb.net/${process.env.MDB_DATABASE}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to the database.' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId.toString();
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }
    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!' });
  }
}

export default handler;
