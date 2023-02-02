import { useEffect, useState } from 'react'
import styles from '../../styles/Pages.module.css'
import { DataTv, episode } from '../../components/interfaces'
import Link from 'next/link'
import Loading from '../../components/Loading'
export async function getStaticPaths() {
 return {
  paths: [],
  fallback: 'blocking', // false or 'blocking'
 }
}
function urlTransform(url: string, id: string): DataTv {
 const [title]: string[] = url.replace('browse-', '').split('-').join(' ').split(' videos')
 const obj = {
  id: Number(id),
  url,
  title,
  episodes: [],
 }
 return obj
}

export async function getStaticProps(context: { params: { id: [string, string] } }) {
 const [id, url] = context.params.id
 const item = urlTransform(url, id)
 console.log('item: ', item)
 const get = await fetch(`${process.env.BACK_URL}/api/infoTvList`, {
  method: 'POST',
  body: JSON.stringify({ item }),
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
 })
 const data = await get.json()
 return {
  props: { data, item, imdbId: Number(id) },
  revalidate: 30 * 24 * 60 * 60,
 }
}
async function getInfo({ item }: { item: episode }): Promise<DataTv | null> {
 try {
  const data = await fetch(`/api/infoTv`, {
   method: 'POST',
   body: JSON.stringify({ item }),
   headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
  const json = await data.json()
  return json
 } catch (error) {
  console.warn(error)
  return null
 }
}

export default function movieId({ data, item, imdbId }: { data: DataTv; imdbId: string; item: DataTv }): JSX.Element {
 const [video, setVideo] = useState<episode | null>(null)
 const [counter, setCounter] = useState(3)
 const [selectValue, setSelectValue] = useState(0)

 useEffect(() => {
  counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
 }, [])

 useEffect(() => {
  if (!data) {
   fetch(`/api/delete`, {
    method: 'DELETE',
    body: JSON.stringify({ item, type: 'Tv' }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
   })
   setTimeout(() => {
    window.location.href = '/series'
   }, 3000)
  }

  if (data) {
   const storage = localStorage.getItem(imdbId)
   if (storage !== 'null' && storage !== null) {
    const item = JSON.parse(storage)
    setVideo(item)
    setSelectValue(item.id)
   } else {
    void (async () => {
     let item = data.episodes[0]
     const _video = await getInfo({ item })
     setVideo(_video)
     item = data.episodes[1]
     await getInfo({ item })
    })()
   }
  }
 }, [data])
 async function changeIndex(e: number, id?: number): Promise<void> {
  if (data && video) {
   setVideo(null)
   let _id = video.id
   if (id !== undefined) {
    _id = id
   }
   let _index = _id + e
   const episodesLength = data.episodes.length
   if (_index >= episodesLength - 1) {
    _index = episodesLength - 1
   }
   if (_index < 0) {
    _index = 0
   }
   setSelectValue(_index)
   const item = data.episodes[_index]
   const _video = await getInfo({ item })
   localStorage.setItem(imdbId, JSON.stringify(_video))
   setVideo(_video)
   _index = _index + 1
   if (_index < episodesLength - 1) {
    const nextItem = data.episodes[_index]
    await getInfo({ item: nextItem })
   }
  }
 }

 if (!data) {
  return (
   <div className={styles.iframe}>
    <div className={styles.error}>
     <h1>I could not find this link!</h1>
     <h1>return to Home in 0{counter} seconds</h1>
    </div>
   </div>
  )
 }
 if (!video) {
  return <Loading />
 }
 return (
  <div className={styles.iframe}>
   <div className={styles.buttons}>
    <Link href={'/series'}>
     <button type="button">Home</button>
    </Link>
    <div className={styles.legend}>
     <h2>{item.title.toUpperCase()}</h2>
    </div>
    <h2>
     <select
      value={selectValue}
      name="select"
      onChange={(e) => {
       changeIndex(0, Number(e.target.value))
      }}
     >
      {data.episodes.map((_item, key) => (
       <option key={key} value={_item.id}>
        {_item.name || _item.id + 1}
       </option>
      ))}
     </select>
    </h2>
    <button
     type="button"
     onClick={() => {
      changeIndex(-1)
     }}
    >
     Return
    </button>
    <button
     type="button"
     onClick={() => {
      changeIndex(1)
     }}
    >
     Next
    </button>
   </div>
   {video && <iframe frameBorder={0} src={'https://sinalpublico.com' + video.url} allowFullScreen></iframe>}
  </div>
 )
}
