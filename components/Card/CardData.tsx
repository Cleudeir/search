import Link from 'next/link'
import styles from './Card.module.css'
export default function CardData({ data, route }: any): JSX.Element {
  const url = data.url.replace('.html', '')
  return (
    <Link href={route + url}>
      <div className={styles.container}>
        <div
          style={{
            backgroundImage: `url(${data.backdrop_path || data.poster_path})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
            padding: 0,
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div className={styles.infos}>
            <div className={styles.titles}>
              <h2>{data.title}</h2>
            </div>
            <div className={styles.overview}>
              <h4>{data.overview}</h4>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
