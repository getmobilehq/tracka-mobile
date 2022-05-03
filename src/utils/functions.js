export const returnPromise = (data, timeout) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });

export const getDiff = (arr1, arr2) => arr1.filter((x) => !arr2.includes(x));
