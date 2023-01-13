import type { NextApiRequest, NextApiResponse } from 'next'
import { DataTv } from '../../components/interfaces'

async function getTmdbTitle(item: DataTv): Promise<DataTv | null> {
  try {
    const title = item.title.toLowerCase().split(' ').join('+')
    const pullInfo = await fetch(
      `https://api.themoviedb.org/3/search/tv?include_adult=false&page=1&language=pt-BR&api_key=5417af578f487448df0d4932bc0cc1a5&query=${title}`
    )
    const jsonInfo = await pullInfo.json()
    if (jsonInfo?.results[0]) {
      const obj = {
        ...item,
        ...jsonInfo.results[0],
        backdrop_path: jsonInfo.results[0].backdrop_path
          ? 'https://image.tmdb.org/t/p/original/' +
          jsonInfo.results[0].backdrop_path
          : null,
        poster_path: jsonInfo.results[0].poster_path
          ? 'https://image.tmdb.org/t/p/w342' + jsonInfo.results[0].poster_path
          : null,
      }
      return obj
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}


export default async function infoMovie(
  req: NextApiRequest,
  res: NextApiResponse<DataTv | null>
): Promise<void> {
  const { item } = req.body
  try {
    const dataTitle = await getTmdbTitle(item)
    res.status(200).json(dataTitle)

  } catch (error) {
    res.status(500).json(null)
    return
  }
}
