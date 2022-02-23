let puppet = require("puppeteer");
let waitSelectAndGetData = require("./modules/waiSelectandGet");
const pdfkit = require("pdfkit")
const fs = require("fs");
(async () => {
  try {
    const browser = await puppet.launch({
      // headless: false,
      defaultViewport: null,
      args: ["--start-maximized"]
    });
    const pages = await browser.pages();
    const cPage = pages[0];
    await cPage.goto(
      "https://www.youtube.com/playlist?list=PLW-S5oymMexXTgRyT3BWVt_y608nt85Uj"
    );
    let name = await waitSelectAndGetData(
      ".ytd-playlist-sidebar-renderer a.yt-formatted-string",
      cPage
    );
    let stats = await waitSelectAndGetData("#stats yt-formatted-string", cPage);
    console.log(name, stats);
    let totalVidLen = parseInt(stats[0].split(" ")[0]);
    let arr = await waitSelectAndGetData(
      "#container>#thumbnail  ytd-thumbnail-overlay-time-status-renderer",
      cPage
    );
    let currentVidLen = arr.pop()
    while (totalVidLen - currentVidLen > 20) {
      await scrollTOBottom(cPage)
      totalVidLen = totalVidLen - currentVidLen
    }
    let arrData = await waitSelectAndGetData(
      "#contents #container #video-title",
      cPage
    );
    let text = JSON.stringify(arrData)
    let doc = new pdfkit();
    doc.pipe(fs.createWriteStream("YouTUBE.pdf"));
    doc.text(text)
    doc.end()
  } catch (err) {
    console.log(err)
  }
})();


function scrollTOBottom(cPage) {
  return new Promise(async (res, rej) => {
    await cPage.evaluate(() => {
      window.scrollBy(0, window.scrollBy(0, document.querySelector("#contents").scrollHeight))
    })
    setTimeout(res, 3000)
  })
}

