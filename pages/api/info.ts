// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const asyncCrawlerSingle = require("../../components/asyncCrawler");

type DataMovie = {
  id: number;
  url: string;
  title: string;
  quality: string;
  year: string;
  dub: boolean;
};
type episode = {
  id: number;
  url: string;
  title: string;
};
type DataTv = {
  id: number;
  url: string;
  episodes: episode[];
};

async function pageIframe(baseUrl: string, item: DataMovie) {
  const resp: any = await asyncCrawlerSingle(baseUrl + item.url);
  const { $ } = resp;
  const response = $("iframe");
  if (
    response &&
    response[0] &&
    response[0].attribs &&
    response[0].attribs.src
  ) {
    const [one, two] = response[0].attribs.src.split(".php");
    const url = one + "hlb" + ".php" + two;
    const result: DataMovie = { ...item, url };
    console.log(result);
    return result;
  }
  return null;
}

async function getMovie(
  baseUrl: string,
  item: DataMovie
): Promise<DataMovie | null> {
  return await pageIframe(baseUrl, item);
}

async function getTv(baseUrl: string, item: DataMovie): Promise<DataTv | null> {
  const resp: any = await asyncCrawlerSingle(`${baseUrl}${item.url}`);
  const { $ } = resp;
  const response = $("a");
  const episodes: episode[] = [];
  let identify = false;
  for (let i = 0; i < response.length; i++) {
    const element = response[i];
    //console.log(element.attribs.href)
    if (element && element.attribs && element.attribs.href) {
      if (element.attribs.href === "#modal-login-form") {
        identify = false;
      }
      if (identify) {
        episodes.push({
          id: episodes.length,
          url: element.attribs.href,
          title:
            element.children[0].parent.prev.data.replace(" - ", "") ||
            "unknown",
        });
      }
      if (element.attribs.href.includes("videos-1-title.html")) {
        identify = true;
      }
    }
  }
  console.log(episodes);
  /*
  const newUrls: episode[] = [];
  async function getInfoIframe(_item: { url: string }) {
    console.log(`${baseUrl}${_item.url}`, _item);
 
    const _data = await pageIframe(`${baseUrl}${_item.url}`, _item);

    if (episodes.length !== newUrls.length) {
      await getInfoIframe(newUrls.length);
    } else {
      return newUrls;
    }
  }
  await getInfoIframe(episodes[0]);
  const result: DataTv = { ...item, newUrls };
    */
  return { ...item, episodes };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataMovie | DataTv | null>
) {
  const { item, type } = req.body;
  console.log({ item, type });
  const baseUrl = "https://redecanais.to";
  if (type === "movie") {
    const movie: DataMovie | null = await getMovie(baseUrl, item);
    return res.status(200).json(movie);
  }
  if (type === "tv") {
    const tv: DataTv | null = await getTv(baseUrl, item);
    return res.status(200).json(tv);
  }
}
