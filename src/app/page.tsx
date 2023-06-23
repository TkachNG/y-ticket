import Image from 'next/image'
import styles from './page.module.css'
import Film from './Film'

export default function Home() {
  return (
    <main className={styles.main}>
      <Film />
    </main>
  )
}
