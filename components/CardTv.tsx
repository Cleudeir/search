import { useState } from 'react'
import { DataTv } from './interfaces'
import styles from '../styles/CardMovie.module.css'
import { useEffect } from 'react'
import CardNoData from './CardNoData'
import CardData from './CardData'

interface Props {
  item: DataTv
  key?: string
  setVideo?: (params: any) => any
}

async function getInfo({ item }: Props): Promise<DataTv | null> {
  try {
    const data = await fetch('/api/infoTv', {
      method: 'POST',
      body: JSON.stringify({ item }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const json = await data.json()
    return json
  } catch (error) {
    console.warn(error)
    return null
  }
}

function CardMovie({ item, setVideo }: Props): JSX.Element {
  const [data, setData] = useState<DataTv | null>(null)

  useEffect(() => {
    void start({ item })
  }, [])
  async function start({ item }: Props): Promise<void> {
    void getInfo({ item }).then((_data) => {
      setData(_data)
    })
  }
  return (
    <>
      {data && <CardData data={data} setVideo={setVideo} />}
      {!data && <CardNoData item={item} />}
    </>
  )
}
export default CardMovie
