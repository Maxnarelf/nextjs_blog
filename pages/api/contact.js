import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    const connectionString = `mongodb+srv://${process.env.MDB_USERNAME}:${process.env.MDB_PASSWORD}@${process.env.MDB_CLUSTERNAME}.8yvqjg9.mongodb.net/${process.env.MDB_DATABASE}?retryWrites=true&w=majority`

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error){
      res.status(500).json({message: 'Could not connect to database.'})
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({message: 'Storing message failed!'})
      return;
    }

    client.close()

    res
      .status(201)
      .json({ message: "Syccessfully stored message!", message: newMessage });
  }
}

export default handler;
