import Head from 'next/head'
import styles from '../../styles/Pages.module.css'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading'
import { useRouter } from 'next/router'
import { DataMovie } from '../../components/interfaces'

async function getData(url: string): Promise<any> {
  const get = await fetch(url)
  const data: any = (await get.json()) || null
  return data
}

export async function getStaticProps() {
  console.log('getStatic - Home: ')
  const resp = await fetch(`${process.env.BACK_URL}/api/mapMovie`)
  const data = await resp.json()
  return {
    props: { data },
    revalidate: 30 * 24 * 60 * 60,
  }
}

export default function Home({ data }: { data: DataMovie[] }): JSX.Element {
  const [search, setSearch] = useState<any | null>(null)
  const [numberCards] = useState(10)
  const { route } = useRouter()
  console.log(route)
  useEffect(() => {
    const num = 0
    setSearch(data?.slice(num, num + numberCards))
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
