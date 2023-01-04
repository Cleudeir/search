import { JSDOM } from 'jsdom'
import * as fs from 'fs/promises'

const getWebsiteContent = async (url: string): Promise<string> => {
  const name = url.split('/').join('').split('.').join('').replace('https:', '').replace('html', '')
  try {
    const read = await fs.readFile(`temp/${name}.html`)
    const text = String(read)
    console.log('read')
    return text
  } catch (error) {
    // Simple HTTP call
    const content = await fetch(url)
    // Parsing to result as text
    const text = await content.text()
    console.log({ name })
    await fs.writeFile(`temp/${name}.html`, text)
    return text
  }
}

const asyncCrawlerSingle = async function (url: string): Promise<any> {
  try {
    // Run the Crawler
    // Get the HTML of the URL
    const websiteHtml = await getWebsiteContent(url)
    // Create JSDOM to have a virtual DOM we can query
    const dom: JSDOM = new JSDOM(websiteHtml)
    const doc: Document = dom.window.document
    // Print the parameters + result
    console.log('---------------------')
    console.log(`Crawling URL: '${url}'`)
    console.log('---------------------')
    return doc
  } catch (error) {
    console.log('asyncCrawlerSingle ', error)
  }
}

export default asyncCrawlerSingle
