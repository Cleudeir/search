import { useState } from 'react'
import { DataMovie } from './interfaces'
import styles from '../styles/CardMovie.module.css'
import { useEffect } from 'react'

interface Props {
  item: DataMovie
  type: string
  key: string
  setVideo?: (params: any) => any
}

async function getInfo ({ item, type }: Props): Promise<DataMovie | null> {
  const data = await fetch('/api/infoMovie', {
    method: 'POST',
    body: JSON.stringify({ item, type }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
  return await data.json()
}

function CardMovie ({ item, type, setVideo }: Props): JSX.Element {
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
      <div className={styles.container} onClick={() => { console.log(data.url); setVideo(data) }}>
        <div
          style={{
            backgroundImage: `url(${data.backdrop_path || data.poster_path})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
            padding: 10,
            borderRadius: 5,
            display: 'flex',
            alignItems: 'strech',
            justifyContent: 'space-between'
          }}
        >
          <div className={styles.infos}>
            <div>
              <h2>{data.title}</h2>
              {data.dub ? 'Dublado' : 'Legendado'}, {data.quality}, {data.year}
            </div>
            <div>
              <h4>{data.overview}</h4>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
export default CardMovie
