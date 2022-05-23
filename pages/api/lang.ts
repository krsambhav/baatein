import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("chats");
  let bodyObject = req.body;
  let setLang = await db.collection("user_langs").updateOne({email:bodyObject.email}, {$set:{lang:bodyObject.lang}}, {upsert:true});
  res.json(setLang);
}
