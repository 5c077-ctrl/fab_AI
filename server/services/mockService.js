const mocks = {
    image: "[Simulation] Image generee localement.",
    site: "[Simulation] <html><body><h1>Mon site</h1></body></html>",
    app: "[Simulation] structure d'application generee.",
    jeu: "[Simulation] mini-jeu charge avec succes .",
    interface: "[Simulation] interface utilisateur generee.",
    texte: "[Simulation] texte genere avec succes.",
    default: "[Simulation] Contenu genere avec succes.",
    code: "[Simulation] code source genere avec succes.",
};
function getMock(domain) {
    return mocks[domain] || mocks.default;

}
module.exports = {
    getMock
};