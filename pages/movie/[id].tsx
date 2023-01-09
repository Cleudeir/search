import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/movie.module.css'
import { DataMovie } from '../../components/interfaces'
import Link from 'next/link'

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
function urlTransform(router: any): DataMovie {
  const [baseArray]: string[] = router.split('-').join(' ').split('_')
  const baseString = baseArray.split(' ')
  const title: string = baseString
    .slice(0, -2)
    .filter((item: string) => item !== 'dublado')
    .join(' ')
  const dub: boolean = baseString.includes('dublado')
  const [year, quality]: string[] = baseString.slice(-2)
  return {
    id: Math.ceil(Math.random() * 1000),
    title,
    dub,
    year,
    quality,
    url: router + '.html',
  }
}

export default function movieId(): JSX.Element {
  const router = useRouter().query.id
  const [video, setVideo] = useState<any>(null)
  // -----------------
  useEffect(() => {
    if (!router) {
      return
    }
    void (async () => {
      const item = urlTransform(router)
      console.log(item)
      const data = await getInfo(item)
      console.log('data: ', data)
      setVideo(data)
    })()
  }, [router])

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
