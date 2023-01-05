import type { NextApiRequest, NextApiResponse } from "next";
import asyncCrawlerSingle from "../../components/asyncCrawler";
import * as fs from "fs/promises";
interface DataTv {
  id: number;
  url: string;
  title: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataTv[]>
): Promise<void> {
  const baseUrl = "https://redecanais.la";
  const name = `${baseUrl}/mapa.html`
    .split("/")
    .join("")
    .split(".")
    .join("")
    .replace("https:", "")
    .replace("html", "");
  try {
    const read: any = await fs.readFile(`temp/${name}.json`);
    const text: DataTv[] = await JSON.parse(read);
    res.status(200).json(text);
    return;
  } catch (error) {
    const get: any = await asyncCrawlerSingle(`${baseUrl}/mapa.html`);
    const response = [];
    get.querySelectorAll("a").forEach((x: { innerHTML: any; href: any }) => {
      if (x.innerHTML === "<b>Acessar</b>" || x.innerHTML === "Acessar") {
        response.push(x.href);
      }
    });

    const data: DataTv[] = [];
    for (let i = 0; i < response.length; i++) {
      const url: string = String(response[i]);
      const [title]: string[] = url
        .replace("/browse-", "")
        .split("-")
        .join(" ")
        .split(" videos");
      data.push({ id: i, url, title });
    }
    console.log("mapSeries: ", data.length);
    await fs.writeFile(`temp/${name}.json`, JSON.stringify(data));
    res.status(200).json(data);
  }
}
