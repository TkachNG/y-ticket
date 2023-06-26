'use client'

import { useCallback, useMemo } from "react";

import { Input } from "@/ui/input/Input";
import cl from "classnames";
import { filterActions } from "@/redux/features/moviesFilter";
import styles from './filter.module.css'
import { useDispatch } from "react-redux";
import { Select } from "@/ui/select/Select";
import { useGetCinemasQuery, useGetMoviesQuery } from "@/redux/services/movieApi";
import { genreEnum } from "@/components/movie/genreEnum";

export const Filter = () => {

  const dispatch = useDispatch();

  const setName = useCallback((name: string) => dispatch(filterActions.setName(name)), []);
  const setGenre = useCallback((name: string) => dispatch(filterActions.setGenre(name)), []);
  const setCinema = useCallback((name: string) => dispatch(filterActions.setCinema(name)), []);

  const { cinemas, isLoading, error } = useGetCinemasQuery();

  const cinemasMap = useMemo((): Record<string, string> => {
    let result: Record<string, string> = [];
    if (!cinemas) return [];
    console.log('cinemas', cinemas);
    return [];
  }, [cinemas, isLoading]);

  return (
    <div className={cl(styles.filter)}>
      <h3 className={cl(styles.title)}>Фильтр поиска</h3>

      <div className={cl(styles.filters)}>
        <Input title="Название" placeholder="Введите название" className={styles.filterItem} setValue={setName}/>

        <Select title="Жанр" placeholder="Выберите жанр" className={styles.filterItem} setValue={setGenre}/>

        <Select variants={cinemasMap} title="Кинотеатр" placeholder="Выберите кинотеатр" className={styles.filterItem}
                setValue={setCinema}/>

      </div>
    </div>
  )
}
