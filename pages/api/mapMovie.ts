import type { NextApiRequest, NextApiResponse } from 'next'
import asyncCrawlerSingle from '../../components/asyncCrawler'

interface DataMovie {
  id: number
  url: string
  title: string
  quality: string
  year: string
  dub: boolean
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<DataMovie[]>
): Promise<void> {
  const baseUrl = 'https://redecanais.la'

  const get: any = await asyncCrawlerSingle(`${baseUrl}/mapafilmes.html`)
  const query = get.querySelectorAll('a')
  const response: string[] = Array.from(query)
  const data: DataMovie[] = []
  for (let i = 0; i < response.length; i++) {
    const url: string = String(response[i])
    const [baseArray]: string[] = url.replace('/', '').split('-').join(' ').split('_')
    const baseString = baseArray.split(' ')
    const title: string = baseString
      .slice(0, -2)
      .filter((item: string) => item !== 'dublado')
      .join(' ')
    const dub: boolean = baseString.includes('dublado')
    const [year, quality]: string[] = baseString.slice(-2)
    data.push({ id: i, url, title, quality, year, dub })
  }

  console.log('mapFilmes: ', data.length)
  res.status(200).json(data)
}
