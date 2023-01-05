import type { NextApiRequest, NextApiResponse } from "next";
import { DataTv } from "../../components/interfaces";

export default async function infoMovie(
  req: NextApiRequest,
  res: NextApiResponse<DataTv | undefined>
): Promise<void> {
  const { item } = req.body;
  try {
    const data = await fetch(process.env.BACK_URL + "/api/infoTv", {
      method: "POST",
      body: JSON.stringify({ item }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });
    const result = await data.json();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return null;
  }
}
