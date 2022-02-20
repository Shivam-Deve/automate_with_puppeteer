let puppet = require("puppeteer");
(async () => {
  const browser = await puppet.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
  });
  const pages = await browser.pages();
  const cPage = pages[0];
  await cPage.goto(
    "https://www.youtube.com/playlist?list=PL-Jc9J83PIiGT2wmeqRM6ZcjdsqlFvDMz"
  );
  let name = await waitSelectAndGetData(
    ".ytd-playlist-sidebar-renderer a.yt-formatted-string",
    cPage
  );
  let stats = await waitSelectAndGetData("#stats yt-formatted-string", cPage);
  console.log(name, stats);
})();

function waitSelectAndGetData(select, cPage) {
  return new Promise(async (resolve, reject) => {
    try {
      await cPage.waitForSelector(select);
      let name = await cPage.evaluate(s => {
        let reObj = [];
        let arr = document.querySelectorAll(s);
        for (let i = 0; i < arr.length; i++) {
          reObj.push(arr[i].innerText);
        }
        return reObj;
      }, select);
      resolve(name);
    } catch (err) {
      reject(err);
    }
  });
}
