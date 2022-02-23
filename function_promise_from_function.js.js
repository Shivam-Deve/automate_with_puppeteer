let s1 = e => {
  //
  let work1 = {
    w1: () => {
      return new Promise((res, rej) => {
        if (e % 2 == 0) {
          setTimeout(() => {
            res("done");
          }, 7000);
        } else {
          rej;
        }
      });
    }
  };

  return new Promise((res, rej) => {
    if (e % 2 == 0) {
      setTimeout(() => {
        res(work1);
      }, 3000);
    } else {
      rej;
    }
  });
};

(async () => {
  try {
    let res = await s1(2);
    let res1 = await res.w1();
    console.log("doneby", res1);
  } catch (err) {
    console.log(err);
  }
})();
