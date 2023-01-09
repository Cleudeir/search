export interface DataMovie {
  id: number
  url: string
  title: string
  quality: string
  year: string
  dub: boolean
  adult?: boolean
  backdrop_path?: string
  genre_ids?: number[]
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: string
  poster_path?: string
  release_date?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

export interface episode {
  id: number
  url: string
}
export interface DataTv {
  id: number
  url: string
  title: string
  episodes: episode[]
  adult?: boolean
  backdrop_path?: string
  genre_ids?: number[]
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: string
  poster_path?: string
  release_date?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}
export interface Data {
  movie: DataMovie[]
  tv: DataTv[]
}
export type dataType = DataMovie[] | DataTv[] | null
export type singleDataType = DataMovie | DataTv | null
