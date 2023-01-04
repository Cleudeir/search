import type { NextApiRequest, NextApiResponse } from 'next'
import asyncCrawlerSingle from '../../components/asyncCrawler'

interface DataTv {
  id: number
  url: string
  title: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<DataTv[]>
): Promise<void> {
  const baseUrl = 'https://redecanais.la'

  const get: any = await asyncCrawlerSingle(`${baseUrl}/mapa.html`)
  const query = get.querySelectorAll('a')
  const response: string[] = Array.from(query)
  const data: DataTv[] = []
  for (let i = 0; i < response.length; i++) {
    const url: string = String(response[i])
    const [title]: string[] = url
      .replace('/browse-', '')
      .split('-')
      .join(' ')
      .split(' videos')
    data.push({ id: i, url, title })
  }
  console.log('mapSeries: ', data.length)
  res.status(200).json(data)
}
