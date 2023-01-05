import type { NextApiRequest, NextApiResponse } from "next";
import { DataMovie } from "./../../components/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataMovie[]>
): Promise<void> {
  try {
    const data = await fetch(process.env.BACK_URL + "/api/mapMovie");
    const result = await data.json();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return null;
  }
}
