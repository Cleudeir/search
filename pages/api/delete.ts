import type { NextApiRequest, NextApiResponse } from 'next'
import { episode } from '../../components/interfaces'


export default async function infoTv(
  req: NextApiRequest,
  res: NextApiResponse<episode | null>
): Promise<void> {
  const { item, type } = req.body
  try {
    const data = await fetch(`${process.env.BACK_URL}/api/delete${type}`, {
      method: 'DELETE',
      body: JSON.stringify({ item }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const json = await data.json()
    res.status(200).json(json)
  } catch (error) {
    console.warn(error)
    res.status(500).json(null)
  }
}
