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
    const data = await fetch('/api/infoTv', {
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
  const [title]: string[] = url
    .replace('/browse-', '')
    .split('-')
    .join(' ')
    .split(' videos')
  return { id: Math.ceil(Math.random() * 1000), url, title }
}

export default function movieId(): JSX.Element {
  const url = useRouter().query.id
  const [video, setVideo] = useState(null)
  const [index, setIndex] = useState<number>(0)

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
      if (data?.title) {
        const storage = Number(localStorage.getItem(data.title))
        if (storage) {
          setIndex(storage)
        }
      }
    })()
  }, [url])
  function changeIndex(e: number): void {
    if (video) {
      let _index = index + e
      const episodesLength = video.episodes.length || 0
      if (_index > episodesLength - 1) {
        _index = episodesLength - 1
      }
      if (_index < 0) {
        _index = 0
      }
      localStorage.setItem(video.title, String(_index))
      setIndex(_index)
    }
  }
  if (!video) {
    return <></>
  }
  return (
    <div className={styles.iframe}>
      <div className={styles.buttons}>
        <Link href={'/series'}>
          <button type="button">Home</button>
        </Link>
        <div className={styles.legend}>
          <h2>{video.title}</h2>
        </div>
        <h2>
          {video.episodes[index].id + 1}/{video.episodes.length}
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
      <iframe
        name="Player"
        frameBorder={0}
        src={'https://sinalpublico.com' + video.episodes[index].url}
        allowFullScreen
      ></iframe>
    </div>
  )
}
