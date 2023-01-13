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

 return (
  <>
   {data && (
    <a href={route + '/' + data.id + data.url.replace('.html', '')}>
     <div className={styles.container}>
      <div
       style={{
        backgroundImage: `url(${data.backdrop_path || data.poster_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        padding: 0,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
       }}
      >
       <div className={styles.infos}>
        <div className={styles.title}>
         <h2>{data.title.toUpperCase()}</h2>
        </div>
        <div className={styles.overview}>
         <h4>{data.overview}</h4>
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
