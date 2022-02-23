module.exports = function waitSelectAndGetData(select, cPage) {
  return new Promise(async (resolve, reject) => {
    try {
      await cPage.waitForSelector(select);
      let name = await cPage.evaluate(s => {
        let reObj = [];
        let arr = document.querySelectorAll(s);
        for (let i = 0; i < arr.length; i++) {
          reObj.push(arr[i].innerText);
        }
        reObj.push(arr.length);
        return reObj;
      }, select);
      resolve(name);
    } catch (err) {
      reject(err);
    }
  });
};
