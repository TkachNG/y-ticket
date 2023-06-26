'use client'

import { CartItemAmount } from "@/components/cart/CartItemAmount";
import { FunctionComponent } from "react";
import Image from 'next/image';
import Link from "next/link";
import { Movie } from "./Movies";
import cl from "classnames";
import { genreEnum } from "@/components/movie/genreEnum";
import styles from './movieItem.module.css'

interface Props {
  movie: Movie,
  className: string,
  canReset?: boolean
}

export const MovieItem: FunctionComponent<Props> = ({ movie, className, canReset }) => {
  return (
    <div className={cl(styles.container, className)}>
      <div className={cl(styles.movieInfo)}>
        <Image src={movie.posterUrl} alt={movie.title} width={300} height={450} className={cl(styles.image)} loading={'lazy'}/>
        <div>
          <Link href={`/movie/${movie.id}`} className={cl(styles.title)}>{movie.title}</Link>
          <p className={cl(styles.genre)}>{genreEnum[movie.genre] ?? movie.genre}</p>
        </div>
      </div>

      <CartItemAmount productId={movie.id} canReset={canReset}/>
    </div>
  )
}
