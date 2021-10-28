const puppeteer = require('puppeteer');
const fs = require('fs');
const db = require('../database/db');

async function archiveUrl(url) {
    const filename = url.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // get page's title
    const title = await page.title();

    // get screenshot
    await page.screenshot({path: './data/screenshots/' + filename + '.png', fullPage: true});

    // get pdf
    await page.pdf({path: './data/pdf/' + filename + '.pdf', format: 'A4'});

    // save html
    await page.evaluate(() => {
      return document.documentElement.outerHTML;
    }).then(html => {
      fs.writeFile('./data/html/' + filename + '.html', html, function(err) {
        if(err) {
          return console.log(err);
        }
      });
    });

    // close browser
    await browser.close();

    // save url to database
    db.saveUrl(url, title, filename);

    return filename;
}

// export module
module.exports = {
    archiveUrl: archiveUrl
};