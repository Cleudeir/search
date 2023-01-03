/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { DataTv, DataMovie } from './interfaces'

async function getInfo ({ item, type }): Promise<DataTv | DataMovie | null> {
  const data = await fetch('/api/info', {
    method: 'POST',
    body: JSON.stringify({ item, type }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
  return await data.json()
}
interface Props {
  item: DataTv
  type: string
  key: string
}

function CardTv ({ item, type }: Props): JSX.Element {
  const [_data, _setData] = useState<DataTv | undefined>(null)
  return (
      <div>

      </div>
  )
}
export default CardTv
