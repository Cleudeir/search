import Crawler from "crawler";

const asyncCrawlerSingle = async function (url) {
  try {
    let promise = await new Promise(function (resolve, reject) {
      const c = new Crawler({
        retries: 0,
        callback(error, res, done) {
          if (error) {
            reject();
          }
          resolve(res);
          done();
        },
      });
      c.queue(url);
    });
    return promise;
  } catch (error) {
    console.log("asyncCrawlerSingle ", error);
  }
};
module.exports = asyncCrawlerSingle;
