import type { NextApiRequest, NextApiResponse } from "next";
import asyncCrawlerSingle from "../../components/asyncCrawler";
import { DataMovie } from "../../components/interfaces";
import * as fs from "fs/promises";

async function getMovie(baseUrl: string, item: DataMovie): Promise<DataMovie> {
  const doc: any = await asyncCrawlerSingle(baseUrl + item.url);
  if (!doc) {
    return null;
  }
  const response = String(
    doc.querySelectorAll('iframe[name="Player"]')[0].attributes.src.textContent
  );
  const [one, two] = response.split(".php");
  const url: string = `${one}hlb.php${two}`;
  const result: DataMovie = { ...item, url };
  console.log(result);
  return result;
}

async function getIMDB(item: DataMovie): Promise<DataMovie | null> {
  const api = {
    url: "https://api.themoviedb.org/3",
    key: "5417af578f487448df0d4932bc0cc1a5"
  };
  try {
    const title = item.title.toLowerCase().split(" ").join("+");
    const { year } = item;
    const pullInfo = await fetch(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=pt-BR&api_key=${api.key}&query=${title}&year=${year}`
    );
    const jsonInfo = await pullInfo.json();
    if (jsonInfo?.results[0]?.id) {
      console.log(jsonInfo?.results[0]);
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
  res: NextApiResponse<DataMovie | undefined>
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
    const movie = await getMovie(baseUrl, item);
    if (!movie) {
      res.status(200).json(movie);
      return;
    }
    const movieIMDB = await getIMDB(movie);
    await fs.writeFile(`temp/${name}.json`, JSON.stringify(movieIMDB));
    res.status(200).json(movieIMDB);
  }
}
