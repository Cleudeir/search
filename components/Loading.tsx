import Image from 'next/image'

export default function Loading(): JSX.Element {
 return (
  <div
   style={{
    width: '100%',
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   }}
  >
   <Image style={{ padding: 'auto' }} width={100} height={100} src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt={'loading'} />
  </div>
 )
}
