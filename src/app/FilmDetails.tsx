import Image from 'next/image'
import styles from './page.module.css'
import { FunctionComponent } from 'react';
import cl from 'classnames';

interface Props {
  title: string,
  genre: 'comedy' | 'horror',
  seasonsCount?: number,
}

export const FilmDetails: FunctionComponent<Props> = ({ title, genre, seasonsCount }) => {
  let count = 0;
  return (
    <div>
      <p>{title || "Unknown"}</p>
      {Boolean(genre) && <p>{genre}</p>}
      <p>{seasonsCount}</p>
      <div className={cl(styles.center)}>
        {/* <button onClick={() => {count = count - 1}}></button> */}
      </div>
    </div>
  );
}
