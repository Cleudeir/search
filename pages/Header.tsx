import { DataMovie, DataTv } from '../components/interfaces'
import styles from './Header.module.css'
import React, { useRef, useState } from 'react'

interface Props {
  filterData: any
  type: boolean
  setType: (a: boolean) => any
}

export default function Header({
  filterData,
  type,
  setType,
}: Props): JSX.Element {
  const [text, setText] = useState<string>('')
  const inputRef = useRef(null)
  return (
    <main className={styles.main}>
      <div>
        <button
          style={
            !type
              ? { backgroundColor: 'rgba(255, 255, 255,0.7)' }
              : { backgroundColor: 'rgba(255, 0, 255,0.3)' }
          }
          onClick={() => {
            setType(true)
          }}
        >
          Movie
        </button>
        <button
          style={
            !type
              ? { backgroundColor: 'rgba(255, 0, 255,0.3)' }
              : { backgroundColor: 'rgba(255, 255, 255,0.7)' }
          }
          onClick={() => {
            setType(false)
          }}
        >
          Series
        </button>
        <input
          ref={inputRef}
          type="text"
          value={String(text)}
          onChange={(e) => {
            setText(String(e.target.value))
          }}
          placeholder={`Search... ${type ? 'movies' : 'tv'}`}
        />
        <button
          onClick={() => {
            filterData(text)
            setText('')
          }}
        >
          search
        </button>
      </div>
    </main>
  )
}
