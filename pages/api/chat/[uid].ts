import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("chats");
  const { uid } = req.query;
  const chats = await db.collection("chatData").find({uid: uid}).toArray();
  res.json({ status: 200, data: chats });
}
