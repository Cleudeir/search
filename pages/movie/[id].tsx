import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/movie.module.css'
import { DataMovie } from '../../components/interfaces'
import Link from 'next/link'

async function getData(url: string): Promise<any> {
  const get = await fetch(url)
  const data: any = (await get.json()) || null
  return data
}
async function getInfo(item: DataMovie): Promise<DataMovie | null> {
  try {
    const data = await fetch('/api/infoMovie', {
      method: 'POST',
      body: JSON.stringify({ item }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const _data = await data.json()
    return _data
  } catch (error) {
    console.warn(error)
    return null
  }
}
function urlTransform(url) {
  const [baseArray]: string[] = url
    .replace('/', '')
    .split('-')
    .join(' ')
    .split('_')
  const baseString = baseArray.split(' ')
  const title: string = baseString
    .slice(0, -2)
    .filter((item: string) => item !== 'dublado')
    .join(' ')
  const dub: boolean = baseString.includes('dublado')
  const [year, quality]: string[] = baseString.slice(-2)
  return { title, dub, year, quality, url: url + '.html' }
}

export default function movieId(): JSX.Element {
  const url = useRouter().query.id
  const [video, setVideo] = useState(null)
  // -----------------
  useEffect(() => {
    if (!url) {
      return
    }
    void (async () => {
      const item = urlTransform(url)
      console.log(item)
      const data = await getInfo(item)
      console.log('data: ', data)
      setVideo(data)
    })()
  }, [url])

  if (!video) {
    return <></>
  }
  return (
    <div className={styles.iframe}>
      <div className={styles.buttons}>
        <Link href={'/movie'}>
          <button type="button">Home</button>
        </Link>

        <div className={styles.legend}>
          <h2>{video.title}</h2>
        </div>
      </div>
      <iframe
        name="Player"
        frameBorder={0}
        src={'https://sinalpublico.com' + video.url}
        allowFullScreen
      ></iframe>
    </div>
  )
}
