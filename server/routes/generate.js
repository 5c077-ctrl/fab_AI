const express = require("express")
const router = express.Router()
const { generate } = require("../services/geminiService")
const { generateImageUrl } = require("../services/imageService")
const { getMock } = require("../services/mockService")
const { saveGeneration } = require("../controllers/generateController")

router.post("/", async (req, res) => {
    const { domain, prompt } = req.body

    if (!domain || !prompt) {
        return res.status(400).json({ error: "domain et prompt sont requis" })
    }

    try {
        let result

        if (domain === "image") {
            result = generateImageUrl(prompt)
        } else {
            result = await generate(domain, prompt)
        }

        await saveGeneration(domain, prompt, result, "online")
        res.json({ result, mode: "online" })

    } catch (err) {
        console.error("Erreur API :", err.message)
        const result = getMock(domain)
        await saveGeneration(domain, prompt, result, "offline")
        res.json({ result, mode: "offline" })
    }
})

module.exports = router