/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { DataTv } from '../interfaces'
import { useEffect } from 'react'
import styles from './Card.module.css'
interface Props {
 item: DataTv
 url: string
 route?: string
 key?: string
}

async function getInfo({ item, url }: Props): Promise<DataTv | null> {
 try {
  const data = await fetch(url, {
   method: 'POST',
   body: JSON.stringify({ item }),
   headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
  const json = await data.json()
  console.log('json: ', json)
  return json
 } catch (error) {
  console.warn(error)
  return null
 }
}

function Card({ item, url, route }: Props): JSX.Element {
 const [data, setData] = useState<DataTv | null>(null)

 useEffect(() => {
  async function start(): Promise<void> {
   void getInfo({ item, url }).then((_data) => {
    setData(_data)
   })
  }
  start()
 }, [])

 const newLocal: number = data?.overview?.length || 0
 return (
  <>
   {data && (
    <a href={route + '/' + data.id + data.url.replace('.html', '')}>
     <div className={styles.container}>
      <div>
       <div>
        <img
         src={String(data.backdrop_path || data.poster_path)}
         alt={data.url}
        />
       </div>
       <div className={styles.containerText}>
        <div className={styles.title}>{data.title.toUpperCase()}</div>
        <div className={styles.vote}>⭐{data.vote_average}</div>
        <div className={styles.overview}>
         <h4>
          {newLocal > 630
           ? `${data?.overview?.slice(0, 630)}...`
           : data.overview}
         </h4>
        </div>
       </div>
      </div>
     </div>
    </a>
   )}
  </>
 )
}
export default Card
