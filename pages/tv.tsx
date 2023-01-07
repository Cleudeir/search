import styles from '../styles/movie.module.css'
import React, { useState } from 'react'
import { DataTv } from '../components/interfaces'
import CardTv from '../components/CardTv'
import VideoTv from './VideoTv'
interface Props {
  search: any
}

export default function Tv({ search }: Props): JSX.Element {
  const [video, setVideo] = useState<DataTv | null>(null)
  return (
    <main className={styles.main}>
      {!video && (
        <div className={styles.cards}>
          {search?.map((item: DataTv) => (
            <CardTv item={item} setVideo={setVideo} key={String(item.id)} />
          ))}
        </div>
      )}
      {video && <VideoTv video={video} setVideo={setVideo} />}
    </main>
  )
}
