import { useEffect, useState } from 'react'
import styles from '../styles/movie.module.css'
import { DataTv } from '../components/interfaces'
interface PropsVideo {
  video: any
  setVideo: (params: any) => any
}

export default function VideoTv({ video, setVideo }: PropsVideo): JSX.Element {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
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
    return <></>
  }
  return (
    <div className={styles.iframe}>
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => {
            setVideo(null)
          }}
        >
          Home
        </button>
        <div className={styles.legend}>
          <h2>{video.title}</h2>
        </div>
        <h2>
          {video.episodes[index].id}/{video.episodes.length - 1}
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
