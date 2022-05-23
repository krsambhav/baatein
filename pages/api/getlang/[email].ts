import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("chats");
  const { email } = req.query;
  const lang = await db.collection("user_langs").find({email: email}).toArray();
  res.json({ status: 200, data: lang });
}
