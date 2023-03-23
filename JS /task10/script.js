const firstPromise = new Promise((resolve) =>
  setTimeout(() => resolve(300), 300)
);
 
const secondPromise = new Promise((resolve) =>
  setTimeout(() => resolve(200), 200)
);
 
const thirdPromise = new Promise((resolve) =>
  setTimeout(() => resolve(100), 100)
);

const promiseAll = (promisesArray) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    for (let i = 0; i < promisesArray.length; i++) {
      promisesArray[i].then((result) => {
        results[i] = result;
        count++;
        if (count === promisesArray.length) {
          resolve(results);
        }
      }).catch(reject);
    }
  });
}

