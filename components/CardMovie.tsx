import { useState } from 'react'
import { DataMovie, singleDataType } from './interfaces'
import { useEffect } from 'react'
import CardNoData from './CardNoData'
import CardData from './CardData'

interface Props {
  item: singleDataType
  setVideo?: React.Dispatch<React.SetStateAction<DataMovie>> | null
  key?: string
}

async function getInfo({ item }: Props): Promise<DataMovie | null> {
  try {
    const data = await fetch('/api/infoMovie', {
      method: 'POST',
      body: JSON.stringify({ item }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    return await data.json()
  } catch (error) {
    console.warn(error)
    return null
  }
}

function CardMovie({ item, setVideo }: Props): JSX.Element {
  const [data, setData] = useState<DataMovie | null>(null)

  useEffect(() => {
    start({ item })
  }, [])
  function start({ item }: Props): void {
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
