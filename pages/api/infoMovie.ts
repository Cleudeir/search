import type { NextApiRequest, NextApiResponse } from 'next'
import { DataMovie } from '../../components/interfaces'

export default async function infoMovie(
  req: NextApiRequest,
  res: NextApiResponse<DataMovie | null>
): Promise<void> {
  const { item } = req.body
  try {
    const data = await fetch(process.env.BACK_URL + '/api/infoMovie', {
      method: 'POST',
      body: JSON.stringify({ item }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const result = await data.json()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(null)
    return
  }
}
