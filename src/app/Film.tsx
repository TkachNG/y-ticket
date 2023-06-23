import Image from 'next/image'
import styles from './page.module.css'
import { FilmDetails } from './FilmDetails';

export default function Film() {
  return (
    <FilmDetails title='test' genre='comedy'/>
  );
}
