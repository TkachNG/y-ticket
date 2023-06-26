'use client'

import { useGetMovieQuery } from "@/redux/services/movieApi";

import { CartItemAmount } from "@/components/cart/CartItemAmount";
import { FunctionComponent } from "react";
import Image from "next/image";
import { Reviews } from "@/components/reviews/Reviews";
import cl from "classnames";
import { genreEnum } from "@/components/movie/genreEnum";
import styles from './movie.module.css'

export interface Movie {
  id: string,
  description: string,
  title: string,
  genre: string,
  director: string,
  posterUrl: string,
  rating: number,
  releaseYear: number,
  reviewIds: string[],
}

interface Props {
  movieId: string
}

export const Movie: FunctionComponent<Props> = ({ movieId }) => {
  const { data, isLoading, error } = useGetMovieQuery(movieId);

  if (isLoading) {
    return <div className={cl(styles.container)}>Loading...</div>
  }

  if (error) {
    return <div className={cl(styles.container)}>При получении данных произошла ошибка</div>
  }

  if (data === undefined) {
    return <div className={cl(styles.container)}>Нет данных</div>
  }

  return (
    <>
      <div className={cl(styles.container)}>
        <div className={cl(styles.imageContainer)}>
          <Image className={cl(styles.image)} src={data.posterUrl} alt={data.title} width={400} height={500}/>
        </div>

        <div>
          <div className={cl(styles.infoTop)}>
            <h1 className={cl(styles.title)}>{data.title}</h1>
            <CartItemAmount productId={data.id}/>
          </div>

          <div className={cl(styles.infoTable)}>
            <p className={cl(styles.infoItem)}>
              <span className={cl(styles.infoItemBold)}>Жанр:</span> {genreEnum[data.genre] || data.genre}
            </p>
            <p className={cl(styles.infoItem)}>
              <span className={cl(styles.infoItemBold)}>Год выпуска:</span> {data.releaseYear}
            </p>
            <p className={cl(styles.infoItem)}>
              <span className={cl(styles.infoItemBold)}>Рейтинг:</span> {data.rating}
            </p>
            <p className={cl(styles.infoItem)}>
              <span className={cl(styles.infoItemBold)}>Режиссер:</span> {data.director}
            </p>
          </div>

          <div className={cl(styles.description)}>
            <p className={cl(styles.subtitle)}>Описание</p>

            <p className={cl(styles.descriptionText)}>
              {data.description}
            </p>
          </div>

        </div>
      </div>

      <Reviews className={styles.reviews} movieId={data.id}/>
    </>
  )
}
