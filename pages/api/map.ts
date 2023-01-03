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
type DataTv = {
  id: number;
  url: string;
  title: string;
};

async function getMovie(baseUrl: string) {
  const resp: any = await asyncCrawlerSingle(`${baseUrl}/mapafilmes.html`);
  const { $ } = resp;
  const response = $('a:contains("Assistir")');
  const data: DataMovie[] = [];
  for (let i = 0; i < response.length; i++) {
    const url = response[i].attribs.href;
    let [baseArray]: [string] = url
      .replace("/", "")
      .split("-")
      .join(" ")
      .split("_");
    const baseString = baseArray.split(" ");
    const title: string = baseString
      .slice(0, -2)
      .filter((item: string) => item !== "dublado")
      .join(" ");
    const dub: boolean = baseString.includes("dublado");
    const [year, quality]: string[] = baseString.slice(-2);
    data.push({ id: i, url, title, quality, year, dub });
  }

  console.log("mapFilmes: ", data.length);
  return data;
}

async function getTv(baseUrl: string) {
  const resp: any = await asyncCrawlerSingle(`${baseUrl}/mapa.html`);
  const { $ } = resp;
  const response = $('a:contains("Acessar")');
  const data: DataTv[] = [];
  for (let i = 0; i < response.length; i++) {
    const url = response[i].attribs.href;
    let [title]: [string] = url
      .replace("/browse-", "")
      .split("-")
      .join(" ")
      .split(" videos");
    data.push({ id: i, url, title });
  }

  console.log("mapSeries: ", data.length);
  return data;
}

type Data = {
  movie: DataMovie[];
  tv: DataTv[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const baseUrl = "https://redecanais.to";
  const movie = await getMovie(baseUrl);
  const tv = await getTv(baseUrl);

  return res.status(200).json({ movie, tv });
}
