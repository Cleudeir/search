import { useState } from 'react'
import { DataTv } from '../interfaces'
import { useEffect } from 'react'
import CardNoData from './CardNoData'
import CardData from './CardData'

interface Props {
  item: DataTv
  url: string
  route?: string
  key?: string
}

async function getInfo({ item, url }: Props): Promise<DataTv | null> {
  try {
    const data = await fetch(url, {
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

function Card({ item, url, route }: Props): JSX.Element {
  const [data, setData] = useState<DataTv | null>(null)

  useEffect(() => {
    async function start(): Promise<void> {
      void getInfo({ item, url }).then((_data) => {
        setData(_data)
      })
    }
    start()
  }, [])

  return (
    <>
      {data && <CardData data={data} route={route} />}
      {!data && <CardNoData item={item} />}
    </>
  )
}
export default Card
