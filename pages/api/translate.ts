import {Translate} from 'aws-sdk';

const translate = new Translate({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-south-1'
})

export default async function handler(req, res) {
  let bodyObject = req.body;
  const params = {
    SourceLanguageCode: 'auto',
    TargetLanguageCode: bodyObject.targetLanguage,
    Text: bodyObject.msgText
  }
  translate.translateText(params, (err, data) => {
    res.json({ status: 200, data: data.TranslatedText });
  })
}
