const OpenAI = require("openai")

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

async function generate(domain, prompt) {
  const completion = await client.chat.completions.create({
    model: "meta-llama/llama-3.2-3b-instruct:free",
    messages: [
      {
        role: "user",
        content: `Tu es un générateur IA expert.
Domaine: ${domain}
Demande: ${prompt}
Génère un résultat complet, professionnel et détaillé.`
      }
    ]
  })
  return completion.choices[0].message.content
}

module.exports = { generate }