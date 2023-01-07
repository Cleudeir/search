import styles from '../styles/movie.module.css'
import React from 'react'
import CardMovie from '../components/CardMovie'
import { DataMovie, DataTv } from '../components/interfaces'
import { useState } from 'react'

interface Props {
  search: any
}
interface PropsVideo {
  video: any
  setVideo: any
}
interface PropsStateData {
  search: any
}
function Video({ video, setVideo }: PropsVideo): JSX.Element | null {
  const newLocal = video && (
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
      </div>
      <iframe
        name="Player"
        frameBorder={0}
        src={'https://sinalpublico.com' + video.url}
        allowFullScreen
      ></iframe>
    </div>
  )
  return newLocal
}

export default function Movie({ search }: Props): JSX.Element {
  const [video, setVideo] = useState<any | null>(null)
  return (
    <main className={styles.main}>
      {!video && (
        <div className={styles.cards}>
          {search?.map(
            (item: any) =>
              item && (
                <CardMovie setVideo={setVideo} item={item} key={item.title} />
              )
          )}
        </div>
      )}
      {video && <Video video={video} setVideo={setVideo} />}
    </main>
  )
}
