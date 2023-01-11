import styles from '../../styles/Pages.module.css'
import { DataMovie } from '../../components/interfaces'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // false or 'blocking'
  }
}
function urlTransform(router: any): DataMovie {
  const [baseArray]: string[] = router.split('-').join(' ').split('_')
  const baseString = baseArray.split(' ')
  const title: string = baseString
    .slice(0, -2)
    .filter((item: string) => item !== 'dublado')
    .join(' ')
  const dub: boolean = baseString.includes('dublado')
  const [year, quality]: string[] = baseString.slice(-2)
  return {
    id: Math.ceil(Math.random() * 1000),
    title,
    dub,
    year,
    quality,
    url: router,
  }
}
export async function getStaticProps(context: { params: { id: any } }) {
  const { id } = context.params
  const item = urlTransform(id)
  const data = await fetch(`${process.env.BACK_URL}/api/infoMovie`, {
    method: 'POST',
    body: JSON.stringify({ item }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
  const video = await data.json()

  return {
    props: { video, item },
    revalidate: 30 * 24 * 60 * 60,
  }
}

export default function movieId({
  video,
  item,
}: {
  video: DataMovie
  item: DataMovie
}): JSX.Element {
  const [counter, setCounter] = useState(3)

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  useEffect(() => {
    if (!video) {
      fetch(`/api/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ item, type: 'Tv' }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      setTimeout(() => {
        window.location.href = '/movie'
      }, 3000)
    }
  }, [])

  if (!video) {
    return (
      <div className={styles.iframe}>
        <div className={styles.error}>
          <h1>I could not find this link!</h1>
          <h1>return to Home in 0{counter} seconds</h1>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.iframe}>
      <div className={styles.buttons}>
        <Link href={'/movie'}>
          <button type="button">Home</button>
        </Link>
        <div className={styles.legend}>
          <h2>{video.title}</h2>
        </div>
      </div>
      <iframe
        name="Player"
        frameBorder={0}
        src={'https://sinalpublico.com' + video.url}
        allowFullScreen
      ></iframe>
    </div>
  )
}
