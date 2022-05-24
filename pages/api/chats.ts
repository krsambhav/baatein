import clientPromise from "../../lib/mongodb";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1413203",
  key: "3641ccfa046551ca870f",
  secret: "c0dcbd2162ebed0a4925",
  cluster: "ap2",
  useTLS: true
});

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
      pusher.trigger('chat', 'chat-event', {
        'messageSent' : true,
        'targetUser': bodyObject.to
      })
      break;
    case "GET":
      console.log(req.body)
      // const chats = await db.collection('chatData').find({$or:[{'uid':}]}).toArray();
      // res.json({ status: 200, data: chats });
      break;
  }
}
