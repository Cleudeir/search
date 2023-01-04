/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head'
import styles from '../styles/movie.module.css'
import React from 'react'
import CardMovie from '../components/CardMovie'
import { DataMovie } from '../components/interfaces'
import { useState } from 'react'

export default function Movie ({ data, search }): JSX.Element {
  const [video, setVideo] = useState<DataMovie>(false)
  return (
    <main className={styles.main}>
      {!video && search.length > 0 &&
        search.map((item: DataMovie) => (
          <CardMovie setVideo={setVideo} type="movie" item={item} key={item.title} />
        ))}
        {video &&
        <div className={styles.iframe}>
          <div className={styles.buttons}>
          <button type='button' onClick={() => { setVideo(false) }}>return</button>
          </div>
          <iframe name="Player" src={'https://sinalpublico.com' + video.url } allowFullScreen> </iframe>
        </div>
        }
    </main>
  )
}
