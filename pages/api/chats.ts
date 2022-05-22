import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("chats");
  console.log(req.method)
  switch (req.method) {
    case "POST":
      let bodyObject = req.body;
      let newChat = await db
        .collection("chatData")
        .insertOne(bodyObject);
      res.json(newChat);
      break;
    case "GET":
      console.log(req.body)
      // const chats = await db.collection('chatData').find({$or:[{'uid':}]}).toArray();
      // res.json({ status: 200, data: chats });
      break;
  }
}
