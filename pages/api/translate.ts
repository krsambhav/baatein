import {Translate} from 'aws-sdk';

const translate = new Translate({
  accessKeyId: 'AKIAULQLABZDOIB5FWFT',
  secretAccessKey: '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',
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
