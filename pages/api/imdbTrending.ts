import type { NextApiRequest, NextApiResponse } from 'next'

async function getTMDB(type: string, time: string): Promise<object[] | null> {
  try {
    const pullInfo = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/${time}?api_key=5417af578f487448df0d4932bc0cc1a5&language=pt-BR`
    )
    const jsonInfo = await pullInfo.json()
    return jsonInfo.results
  } catch (error) {
    return null
  }
}
export default async function infoMovie(
  req: NextApiRequest,
  res: NextApiResponse<object[] | null>
): Promise<void> {
  const { type, time } = req.body
  try {
    const data = await getTMDB(type, time)
    res.status(200).json(data)
    return
  } catch (error) {
    res.status(500).json(null)
    return
  }
}
