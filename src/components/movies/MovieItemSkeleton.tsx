'use client'

import { CartItemAmount } from "@/components/cart/CartItemAmount";
import { FunctionComponent } from "react";
import Link from "next/link";
import cl from "classnames";
import styles from './movieItem.module.css'

interface Props {
  movieId: string,
  className?: string
  canReset: boolean
}

export const MovieItemSkeleton: FunctionComponent<Props> = ({ movieId, className, canReset }) => {
  return (
    <div className={cl(styles.container, className)}>
      <Link href={`/movie/${movieId}`} className={cl(styles.movieInfo)}>
        <div className={cl(styles.mockImage)}></div>
        <div>
          <p className={cl(styles.title)}>...</p>
          <p className={cl(styles.genre)}>...</p>
        </div>
      </Link>

      <CartItemAmount productId={movieId} canReset={canReset}/>
    </div>
  )
}
