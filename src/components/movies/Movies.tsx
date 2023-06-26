'use client'

import { Filter } from "./Filter";
import { FunctionComponent, useCallback, useMemo } from "react";
import { MovieItem } from "@/components/movies/MovieItem";
import cl from "classnames";
import styles from './movies.module.css'
import { useGetMoviesQuery } from "@/redux/services/movieApi";
import { getCinema, getGenre, getName } from "@/redux/features/moviesFilter/selector";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/store";

export interface Movie {
  id: string,
  title: string,
  genre: string,
  posterUrl: string,
}

export const Movies = () => {
  const name = useSelector((state: StoreState) => getName(state));
  const genre = useSelector((state: StoreState) => getGenre(state));
  const cinema = useSelector((state: StoreState) => getCinema(state));

  const { data, isLoading, error } = useGetMoviesQuery(cinema);

  console.log('cinema', cinema, '//');


  const filterMovies = (name, genre, data) => {
    if ((name || genre) && data && data.length) {
      return data.filter((item) => {
        let filtered = true;
        if (genre) filtered = filtered && item.genre == genre;
        if (name) filtered = filtered && item.title.toLowerCase().indexOf(name.toLowerCase());
        return filtered
      });
    }
    return data;
  };

  const filteredMovies = useMemo(() => {
    return filterMovies(name, genre, data);
  }, [name, genre, data, filterMovies]);

  if (error) {
    return <div className={cl(styles.container)}>
      <Filter/>
      <div>При получении данных произошла ошибка</div>
    </div>
  }

  return (<div className={cl(styles.container)}>
    <Filter/>
    <div>
      {
        isLoading ? <div className={cl(styles.container)}>Loading...</div> :
          Boolean(filteredMovies) ? filteredMovies.map((movie: Movie) => {
            return (<MovieItem key={movie.id} movie={movie} className={styles.movie}/>)
          }) : ''
      }
    </div>
  </div>)
}
