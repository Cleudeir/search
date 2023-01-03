import { useState } from 'react'
import { DataMovie } from './interfaces'
import styles from '../styles/CardMovie.module.css'
import Image from 'next/image'
import { useEffect } from 'react'

interface Props {
  item: DataMovie
  type: string
}

async function getInfo ({ item, type }: Props): Promise<DataMovie | null> {
  const data = await fetch('/api/infoMovie', {
    method: 'POST',
    body: JSON.stringify({ item, type }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
  return await data.json()
}

function CardMovie ({ item, type }: Props): JSX.Element {
  const [data, setData] = useState<DataMovie | null>(null)

  useEffect(() => {
    start({ item, type })
  }, [])
  function start ({ item, type }: Props): void {
    void getInfo({ item, type }).then((_data) => {
      console.log('_data')
      setData(_data)
    })
  }
  //       <iframe name='Player' src={'https://sinalpublico.com' + data.url} height='400' width='640'> </iframe>
  return (
    data && (
      <div className={styles.container}>
        <div>
          <Image
            width={180}
            height={300}
            src={data.poster_path}
            alt={data.title}
          />
        </div>
        <div className={styles.information}>
          <div className={styles.overview}><h5>{data.overview}</h5></div>
          <div>
            <div>
            title: {data.title}
            </div>
            <div>
            dub: {data.dub}
            </div>
            <div>
            id: {String(data.id)}
            </div>
            <div>
            quality: {data.quality}
            </div>
            <div>
            year: {data.year}
            </div>
          </div>
        </div>
      </div>
    )
  )
}
export default CardMovie
