import type { NextApiRequest, NextApiResponse } from 'next'
import asyncCrawlerSingle from '../../components/asyncCrawler'
import { DataTv } from '../../components/interfaces'

async function geTv (baseUrl: string, item: DataTv): Promise<DataTv > {
  const doc: any = await asyncCrawlerSingle(baseUrl + item.url)
  const query = String(doc.querySelectorAll('a'))
  const response: string[] = Array.from(query)
  console.log(response)
  let identify = false
  for (let i = 0; i < response.length; i++) {
    const element = response[i]
    // Console.log(element.attribs.href)
    if (element?.attribs?.href) {
      if (element.attribs.href === '#modal-login-form') {
        identify = false
      }
      if (identify) {
        episodes.push({
          id: episodes.length,
          url: element.attribs.href,
          title:
            element.children[0].parent.prev.data.replace(' - ', '') ||
            'unknown'
        })
      }
      if (element.attribs.href.includes('videos-1-title.html')) {
        identify = true
      }
    }
  }

  console.log(result)
  return result
}

async function getIMDB (item: DataTv): Promise<DataTv | null> {
  const api = {
    url: 'https://api.themoviedb.org/3',
    key: '5417af578f487448df0d4932bc0cc1a5'
  }
  try {
    const title = item.title.toLowerCase().split(' ').join('+')
    const { year } = item
    const pullInfo = await fetch(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=pt-BR&api_key=${api.key}&query=${title}&year=${year}`
    )
    const jsonInfo = await pullInfo.json()
    if (jsonInfo?.results[0]?.id) {
      console.log(jsonInfo?.results[0])
      const obj = {
        ...item,
        ...jsonInfo.results[0],
        backdrop_path: 'https://image.tmdb.org/t/p/original/' + jsonInfo.results[0].backdrop_path,
        poster_path: 'https://image.tmdb.org/t/p/w342' + jsonInfo.results[0].poster_path
      }
      return obj
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

export default async function infoMovie (
  req: NextApiRequest,
  res: NextApiResponse<DataTv | undefined>
): Promise<void> {
  const { item, type } = req.body
  console.log({ item, type })
  const baseUrl = 'https://redecanais.la'
  const movie = await geTv(baseUrl, item)
  const movieIMDB = await getIMDB(movie)
  res.status(200).json(movieIMDB)
}
