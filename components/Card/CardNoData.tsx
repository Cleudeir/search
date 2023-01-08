import styles from './Card.module.css'
export default function CardNoData({ item }: any): JSX.Element {
  return (
    <div
      className={styles.container}
      onClick={() => {
        alert('movie not found or loading...')
      }}
    >
      <div
        style={{
          backgroundImage: `url('https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif')`,
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
            <h2>{item.title}</h2>
          </div>
          <div className={styles.overview}>
            <h4></h4>
          </div>
        </div>
      </div>
    </div>
  )
}
