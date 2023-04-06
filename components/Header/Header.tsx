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

 return (
  <main className={styles.main}>
   <div>
    <Link href={'/series'}>
     <button style={route == '/series' ? { backgroundColor: 'green' } : {}} onClick={() => {}}>
      Series
     </button>
    </Link>
    <Link href={'/movie'}>
     <button style={route == '/movie' ? { backgroundColor: 'green' } : {}} onClick={() => {}}>
      Movie
     </button>
    </Link>
    <input
     ref={inputRef}
     type="text"
     value={String(text)}
     onChange={(e) => {
      setText(String(e.target.value))
      filterData(String(e.target.value))
     }}
     placeholder={`Search...`}
     onKeyDown={(e) => {
      if (e.key === 'Enter') {
       filterData(text)
       setText('')
      }
     }}
    />
   </div>
  </main>
 )
}
