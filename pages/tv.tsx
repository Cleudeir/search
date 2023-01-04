/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head'
import styles from '../styles/movie.module.css'
import React from 'react'
import { DataTv } from '../components/interfaces'
import CardTv from '../components/CardTv'

export default function Tv ({ data, search }): JSX.Element {
  return (
        <main className={styles.main}>
        <h2>{data.length} tv available</h2>
        {search.length > 0 &&
          search.map((item: DataTv) => (
            <CardTv item={item} type="tv" key={item.url} />
          ))}
        </main>
  )
}
