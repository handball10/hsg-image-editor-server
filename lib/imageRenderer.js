const renderer = require('./puppeteer');

async function processRoute(req, res, next) {

    if (!req.query.data) {
        return res.status(400).json({ success: false });
    }

    try {
        const filePath = await renderer(req.query.data);
        res.status(200).json({ image: filePath }); //download(filePath, `hsg-socialmedia-${new Date().getTime()}.png`);

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = processRoute;