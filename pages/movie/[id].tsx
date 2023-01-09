import styles from '../../styles/movie.module.css'
import { DataMovie } from '../../components/interfaces'
import Link from 'next/link'

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
    url: router + '.html',
  }
}
export async function getStaticProps(context: { params: { id: any } }) {
  const { id } = context.params
  const item = urlTransform(id)
  console.log('item: ', item)
  const data = await fetch(`${process.env.BACK_URL}/api/infoMovie`, {
    method: 'POST',
    body: JSON.stringify({ item }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
  const video = await data.json()
  return {
    props: { video },
    revalidate: 30 * 24 * 60 * 60,
  }
}

export default function movieId({ video }: { video: DataMovie }): JSX.Element {
  // -----------------
  if (!video) {
    return <></>
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
