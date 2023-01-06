import type { NextApiRequest, NextApiResponse } from "next";
import { DataTv } from "./../../components/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataTv[]>
): Promise<void> {
  try {
    const data = await fetch(process.env.BACK_URL + "/api/mapTv");
    const result = await data.json();
    res.status(200).json(result);
  } catch (error) {
    return null;
  }
}
