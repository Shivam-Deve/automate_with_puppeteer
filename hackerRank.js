let puppeteer = require("puppeteer")
let gtab

let launchBrowser = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
})

launchBrowser.then(function (browserInstance) {
    let tabOpened = browserInstance.newPage()
    return tabOpened;
}).then(function (newTab) {
    let hackerTab = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login")
    gtab = newTab

    return hackerTab;
}).then(function () {
    let enterEmail = gtab.type("#input-1", "rinawar911@spruzme.com", { delay: 80 })
    return enterEmail

}).then(function () {
    let enterPassword = gtab.type("#input-2", "abcdef1234", { delay: 90 })
    return enterPassword

}).then(function () {
    let LoginClick = gtab.click("button[data-analytics='LoginPassword']", { delay: 100 })
    let NavigationPromise = Promise.all([LoginClick, gtab.waitForNavigation({ waitUntil: "networkidle0" })])
    return NavigationPromise;

}).then(function () {
    let kitClick = gtab.click(`[data-automation="algorithms"]`, { delay: 100 })
    return kitClick
}).then(() => {
    return gtab.waitForSelector('.challenge-submit-btn > button');
}).then(function () {
    let questionArr = gtab.$$(".challenge-submit-btn > button")
    return questionArr
}).then((questionArr) => {
    let questionWillBeSolved = solveQuestion(questionArr[0], gtab)
    return questionWillBeSolved
}).catch(function (err) {
    console.log(err);
})

function solveQuestion(question, gtab) {
    return new Promise(async (resolve, reject) => {
        question.click()
        try {
            await gtab.waitForSelector(".hr-monaco-custom-input-wrapper.flex > div.checkBoxWrapper > div > label")
            await gtab.click(".hr-monaco-custom-input-wrapper.flex > div.checkBoxWrapper > div > label", { delay: 200 })
            await gtab.waitForSelector(".custom-input textarea")
            await gtab.type(".custom-input textarea", "hello", { delay: 50 })
            await gtab.keyboard.down('Control');
            await gtab.keyboard.press('A');
            await gtab.keyboard.press('X');
            await gtab.click('.hr-monaco-editor-parent .monaco-editor.no-user-select .vs', { delay: 200 })
            await gtab.keyboard.down('Control');
            await gtab.keyboard.press('A');
            await gtab.keyboard.press('V');
            await gtab.click('.hr-monaco-submit', { delay: 200 })
            resolve()
        }
        catch (err) {
            reject(err)
        }

    })
}