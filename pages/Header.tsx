/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from '../styles/Header.module.css'
import React, { useEffect, useRef, useState } from 'react'
import { Data } from '../components/interfaces'

async function getData (): Promise<Data> {
  const data = await fetch('/api/mapMovie')
  return await data.json()
}

export default function Header ({
  data,
  filterData,
  type,
  setType
}): JSX.Element {
  const [text, setText] = useState('')
  const inputRef = useRef(null)
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.addEventListener('keypress', function (event: { key: string }) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === 'Enter') {
          // Cancel the default action, if needed
          filterData(inputRef.current.value)
          console.log(inputRef.current.value)
          setTimeout(() => { setText('') }, 100)
        }
      })
    }
  }, [inputRef])

  return (
    <main className={styles.main}>
      <div>
        <button
          style={
            !type
              ? { backgroundColor: 'rgba(255, 255, 255,0.7)' }
              : { backgroundColor: 'rgba(255, 255, 255,0.3)' }
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
              ? { backgroundColor: 'rgba(255, 255, 255,0.3)' }
              : { backgroundColor: 'rgba(255, 255, 255,0.7)' }
          }
          onClick={() => {
            setType(false)
          }}
        >
          Tv
        </button>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
          placeholder={`Search... ${data.length} ${type ? 'movies' : 'tv'}`}
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
