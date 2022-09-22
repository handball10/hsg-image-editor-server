const puppeteer = require('puppeteer');
const path = require('path');

const BASE_URL = 'https://socialmedia.hsg-dm.de';
// const BASE_URL = 'https://socialmedia.hsg-dm.de';
const DOWNLOAD_BASE_PATH = './public/images';

const filePathFactory = () => `${DOWNLOAD_BASE_PATH}/hsg-socialmedia-${new Date().getTime()}.png`;

module.exports = async function renderImage(payload) {

    const url = new URL(BASE_URL);

    url.searchParams.append('data', payload);
    url.searchParams.append('no-controls', true);


    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url.toString(),{
        waitUntil: 'networkidle2',
    });

    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2,
      });

    const content = await page.$('.drawer');

    let file, filePath;

    try {

        file = await content.screenshot({
            // path: './public/images/test.png',
            encoding: 'base64',
            omitBackground: true
        });

    }
    catch (error) {
        console.error(error);
    }
    finally {
        await browser.close();

    }

    return file;
}