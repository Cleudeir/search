import type { NextApiRequest, NextApiResponse } from "next";
import asyncCrawlerSingle from "../../components/asyncCrawler";
import { DataTv, episode } from "../../components/interfaces";
import * as fs from "fs/promises";

async function geTv(baseUrl: string, item: DataTv): Promise<DataTv> {
  const doc1: any = await asyncCrawlerSingle(baseUrl + item.url);
  const response = [];
  doc1.querySelectorAll("a").forEach((x: { innerHTML: any; href: any }) => {
    if (x.innerHTML !== "<strong>Legendado</strong>") {
      if (
        x.innerHTML === "<strong>Assistir</strong>" ||
        x.innerHTML === "<strong>Dublado</strong>"
      ) {
        response.push(x.href);
      }
    }
  });
  if (response.length === 0) {
    return null;
  }
  const episodes: episode[] = [];
  for (let i = 0; i < response.length; i++) {
    console.log(i, "/", response.length - 1);
    const link = baseUrl + String(response[i]);
    const doc2: any = await asyncCrawlerSingle(link);

    if (!doc2) {
      episodes.push({ id: episodes.length, url: link });
      console.log("Error url: ", link);
      continue;
    }
    const response2 =
      doc2.querySelectorAll('iframe[name="Player"]')[0].attributes.src
        .textContent || null;
    if (!response2) {
      continue;
    }
    const link2 = String(response2);
    const [one, two] = link2.split(".php");
    const url: string = `${one}hlb.php${two}`;
    episodes.push({ id: episodes.length, url });
  }
  const promise = await Promise.all(episodes);
  const result = { ...item, episodes: promise };
  return result;
}

async function getIMDB(item: DataTv): Promise<DataTv | null> {
  const api = {
    url: "https://api.themoviedb.org/3",
    key: "5417af578f487448df0d4932bc0cc1a5"
  };
  try {
    const title = item.title.toLowerCase().split(" ").join("+");
    const pullInfo = await fetch(
      `https://api.themoviedb.org/3/search/tv?include_adult=false&page=1&language=pt-BR&api_key=${api.key}&query=${title}`
    );
    const jsonInfo = await pullInfo.json();
    if (jsonInfo?.results[0]?.id) {
      const obj = {
        ...item,
        ...jsonInfo.results[0],
        backdrop_path: jsonInfo.results[0].backdrop_path
          ? "https://image.tmdb.org/t/p/original/" +
            jsonInfo.results[0].backdrop_path
          : null,
        poster_path: jsonInfo.results[0].poster_path
          ? "https://image.tmdb.org/t/p/w342" + jsonInfo.results[0].poster_path
          : null
      };
      return obj;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export default async function infoMovie(
  req: NextApiRequest,
  res: NextApiResponse<DataTv | undefined>
): Promise<void> {
  const { item, type } = req.body;
  console.log({ item, type });
  const baseUrl = "https://redecanais.la";
  const name = item.url
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
    const tv = await geTv(baseUrl, item);
    if (!tv) {
      res.status(200).json(tv);
      return;
    }
    const data = await getIMDB(tv);
    await fs.writeFile(`temp/${name}.json`, JSON.stringify(data));
    res.status(200).json(data);
  }
}
