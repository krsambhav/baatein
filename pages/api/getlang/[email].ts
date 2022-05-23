import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("chats");
  const { email } = req.query;
  let lang = await db.collection("user_langs").find({email: email}).count();
  if(lang == 0){
    lang = await db.collection('user_langs').insertOne({email:email, lang: 'en'});
    lang = await db.collection("user_langs").find({email: email}).toArray();
  } else {
    lang = await db.collection("user_langs").find({email: email}).toArray();
  }
  res.json({status: 200 , data: lang});
}
