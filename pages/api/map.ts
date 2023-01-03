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
interface DataTv {
  id: number
  url: string
  title: string
}

async function getMovie (baseUrl: string): Promise<DataMovie[]> {
  console.log(`${baseUrl}/mapafilmes.html`)
  const get: any = await asyncCrawlerSingle(`${baseUrl}/mapafilmes.html`)
  const query = get.querySelectorAll('a')
  const response: string[] = Array.from(query)
  const data: DataMovie[] = []
  for (let i = 0; i < response.length; i++) {
    const url: string = String(response[i])
    console.log(url)
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
  return data
}

async function getTv (baseUrl: string): Promise<DataTv[]> {
  console.log(`${baseUrl}/mapa.html`)
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
  return data
}

interface Data {
  movie: DataMovie[]
  tv: DataTv[]
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const baseUrl = 'https://redecanais.la'
  const movie = await getMovie(baseUrl)
  const tv = await getTv(baseUrl)

  res.status(200).json({ movie, tv })
}
