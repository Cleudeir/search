import { JSDOM } from "jsdom";

const getWebsiteContent = async (url: string): Promise<string> => {
  try {
    const content = await fetch(url);
    const text = await content.text();
    return text;
  } catch (error) {
    console.log(error);
  }
};

const asyncCrawlerSingle = async function (url: string): Promise<any> {
  try {
    const websiteHtml = await getWebsiteContent(url);
    const dom: JSDOM = new JSDOM(websiteHtml);
    const doc: Document = dom.window.document;
    return doc;
  } catch (error) {
    console.log("asyncCrawlerSingle ");
  }
};

export default asyncCrawlerSingle;
