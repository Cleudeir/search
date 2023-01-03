import Crawler from 'crawler'

const asyncCrawlerSingle = async function (url: string): Promise<any> {
  try {
    const promise = await new Promise(function (resolve, reject) {
      const c = new Crawler({
        retries: 0,
        callback (error, res, done) {
          if (error) {
            reject(error)
          }
          resolve(res)
          done()
        }
      })
      c.queue(url)
    })
    return promise
  } catch (error) {
    console.log('asyncCrawlerSingle ', error)
  }
}

export default asyncCrawlerSingle
