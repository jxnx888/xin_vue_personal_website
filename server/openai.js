const { Configuration, OpenAIApi } = require('openai')
const OPENAI_API_KEY=`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`
const ORGANIZATION_ID=`org-Q5sS3qEhZoUyBzXIl0WsOQEu`

const configuration = new Configuration({
  organization:ORGANIZATION_ID,
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function generateText(prompt, model = 'davinci') {
  const response = await openai.createCompletion({
    model,
    prompt,
  });
  return response.data.choices[0].text.trim();
}

async function translateText(text, sourceLanguage, targetLanguage, model = 'davinci') {
  const response = await openai.Translation.create({
    engine: models[model],
    text,
    source_language: sourceLanguage,
    target_language: targetLanguage,
  });
  return response.data.translations[0].translated_text.trim();
}

module.exports = {
  generateText,
  translateText,
};
