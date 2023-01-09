import styles from './Header.module.css'
import React, { useRef, useState } from 'react'
import Link from 'next/link'

interface Props {
  filterData: any
  route: string
}

export default function Header({ filterData, route }: Props): JSX.Element {
  const [text, setText] = useState<string>('')
  const inputRef = useRef(null)

  const ButtonChangeType = () => {
    if (route === '/movie') {
      return (
        <Link href={'/series'}>
          <button onClick={() => {}}>Series</button>
        </Link>
      )
    } else {
      return (
        <Link href={'/movie'}>
          <button onClick={() => {}}>Movie</button>
        </Link>
      )
    }
  }
  return (
    <main className={styles.main}>
      <div>
        <ButtonChangeType />
        <input
          ref={inputRef}
          type="text"
          value={String(text)}
          onChange={(e) => {
            setText(String(e.target.value))
          }}
          placeholder={`Search...`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              filterData(text)
              setText('')
            }
          }}
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
