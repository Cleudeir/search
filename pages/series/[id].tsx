import { useEffect, useState } from 'react'
import styles from '../../styles/Pages.module.css'
import { DataTv } from '../../components/interfaces'
import Link from 'next/link'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // false or 'blocking'
  }
}
function urlTransform(router: any): DataTv {
  const [title]: string[] = router
    .replace('browse-', '')
    .split('-')
    .join(' ')
    .split(' videos')
  const obj = {
    id: Math.ceil(Math.random() * 1000),
    url: router,
    title,
    episodes: [],
  }
  console.log(obj)
  return obj
}
export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params
  const item = urlTransform(id)
  const data = await fetch(`${process.env.BACK_URL}/api/infoTv`, {
    method: 'POST',
    body: JSON.stringify({ item }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
  const video = await data.json()
  return {
    props: { video },
    revalidate: 30 * 24 * 60 * 60,
  }
}

export default function movieId({ video }: { video: DataTv }): JSX.Element {
  const [index, setIndex] = useState<number>(0)
  const [counter, setCounter] = useState(3)

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  useEffect(() => {
    if (!video) {
      setTimeout(() => {
        window.location.href = '/series'
      }, 3000)
    }

    if (video?.title) {
      const storage = Number(localStorage.getItem(video.title))
      if (storage) {
        setIndex(storage)
      }
    }
  }, [])
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
    return (
      <div className={styles.iframe}>
        <div className={styles.error}>
          <h1>I could not find this link!</h1>
          <h1>return to Home in 0{counter} seconds</h1>
        </div>
      </div>
    )
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
