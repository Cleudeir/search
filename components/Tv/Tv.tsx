import styles from '../styles/movie.module.css'
import React, { useState } from 'react'
import { DataTv } from '../interfaces'
import Card from '../Card/Card'
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
            <Card item={item} key={String(item.id)} url={'/api/imdbTv'} />
          ))}
        </div>
      )}
    </main>
  )
}
