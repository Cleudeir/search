import Head from 'next/head'
import styles from '../../styles/movie.module.css'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading'
import { useRouter } from 'next/router'

async function getData(url: string): Promise<any> {
  const get = await fetch(url)
  const data: any = (await get.json()) || null
  return data
}

interface PropsStateData {
  [x: string]: any
  data: any
  setData: any
}

export default function Home(): JSX.Element {
  const [data, setData] = useState<PropsStateData | null>(null)
  const [search, setSearch] = useState<PropsStateData | null>(null)
  const [numberCards, setNumberCards] = useState(8)
  const { route } = useRouter()
  console.log(route)
  useEffect(() => {
    const numCards = Math.floor(window.screen.width / 340) * 2 || 1
    console.log(window.screen.width, numCards)
    setNumberCards(numCards)
    void (async (): Promise<void> => {
      const _data = await getData('/api/mapMovie')
      setData(_data)
      const num = 0
      setSearch(_data?.slice(num, num + numCards))
    })()
  }, [])

  function filterData(text: string): void {
    if (!data) {
      return
    }
    const _data = data
    const _filter = _data.filter((item: any): any =>
      item.title.toLowerCase().includes(text.toLowerCase())
    )
    if (_filter?.length > numberCards) {
      setSearch(_filter.slice(0, numberCards))
    } else if (_filter.length > 0) {
      setSearch(_filter)
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header filterData={filterData} route={route} />
        {data && search && (
          <main className={styles.main}>
            {
              <div className={styles.cards}>
                {search?.map(
                  (item: any) =>
                    item && (
                      <Card
                        item={item}
                        route={route}
                        key={item.url}
                        url={'/api/imdbMovie'}
                      />
                    )
                )}
              </div>
            }
          </main>
        )}
        {!data && <Loading />}
      </main>
    </>
  )
}
