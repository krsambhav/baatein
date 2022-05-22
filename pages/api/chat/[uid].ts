import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("chats");
  const { uid } = req.query;
  const uid1 = uid.substr(0, 36)
  const uid2 = uid.substr(36, 72)
  const chats = await db.collection("chatData").find({$or:[{uid:uid1},{uid:uid2}]}).toArray();
  res.json({ status: 200, data: chats });
}
