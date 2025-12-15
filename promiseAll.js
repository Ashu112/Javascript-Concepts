// Implement promise.all() in javascript
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    // if iterable is not array reject
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an iterable"));
    }
    const results = [];
    let completed = 0;
    // if iterable is empty return empty array
    if (promises.length === 0) {
      return resolve([]);
    }
    // for every promise in iterable resolve and reject based on promise
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((res) => {
          results[index] = res;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

const P1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("P1 Success"), 3000);
});
const P2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("P2 Success"), 1000);
});
const P3 = new Promise((resolve, reject) => {
  //setTimeout(() => resolve("P3 Success"), 2000);
  setTimeout(() => reject("P3 Fail"), 2000);
});

myPromiseAll([P1, P2, P3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error(err));
