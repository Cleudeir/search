import type { NextApiRequest, NextApiResponse } from "next";
import asyncCrawlerSingle from "../../components/asyncCrawler";
import * as fs from "fs/promises";
interface DataMovie {
  id: number;
  url: string;
  title: string;
  quality: string;
  year: string;
  dub: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataMovie[]>
): Promise<void> {
  const baseUrl = "https://redecanais.la";
  const name = `${baseUrl}/mapafilmes.html`
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
    const get: any = await asyncCrawlerSingle(`${baseUrl}/mapafilmes.html`);
    const response = [];
    get.querySelectorAll("a").forEach((x: { innerHTML: any; href: any }) => {
      if (x.innerHTML === "<b>Assistir</b>") {
        response.push(x.href);
      }
    });
    const data: DataMovie[] = [];
    for (let i = 0; i < response.length; i++) {
      const url: string = String(response[i]);
      const [baseArray]: string[] = url
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
    await fs.writeFile(`temp/${name}.json`, JSON.stringify(data));
    res.status(200).json(data);
  }
}
