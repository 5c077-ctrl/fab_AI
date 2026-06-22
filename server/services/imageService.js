function generateImageUrl(prompt) {
    const encoded = encodeURIComponent(prompt);
    return `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&nologo=true`;
}
module.exports = {
    generateImageUrl
};