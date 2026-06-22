const { GoogleGenerativeAI } = require("@google/generative-ai")
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function generate(domain, prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const fullPrompt = `Tu es un générateur IA expert.
Domaine: ${domain}
Demande: ${prompt}
Génère un résultat complet, professionnel et détaillé.`

    const result = await model.generateContent(fullPrompt)
    return result.response.text()
}

module.exports = { generate }