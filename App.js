let puppet = require("puppeteer");
const automate = async function() {
  try {
    const browser = await puppet.launch({
      headless: false,
      slowMo: true,
      defaultViewport: null
    });
    const pages = await browser.pages();
    const page = pages[0];
    await page.goto("http:/www.google.com/");
    await page.waitForSelector("input[type='text']", { visible: true });
    await page.type("input[type='text']", "pepcoding");
    await page.keyboard.press("Enter");
    await page.waitForSelector("h3.LC20lb.MBeuO.DKV0Md", { visible: true });
    await page.click("h3.LC20lb.MBeuO.DKV0Md");
    await page.waitForSelector("#lp_modal_close", { visible: true });
    await page.click("#lp_modal_close");
  } catch (err) {
    console.log("error=> ", err);
  }
};
automate();
