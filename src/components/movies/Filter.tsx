'use client'

import { useCallback, useMemo } from "react";

import { useGetCinemasQuery } from "@/redux/services/movieApi";
import { filterActions } from "@/redux/features/moviesFilter";
import { genreEnum } from "@/components/movie/genreEnum";
import { useDispatch } from "react-redux";
import { Input } from "@/ui/input/Input";
import { Select } from "@/ui/select/Select";

import styles from './filter.module.css'
import cl from "classnames";


export const Filter = () => {

  const dispatch = useDispatch();

  const setName = useCallback((name: string) => dispatch(filterActions.setName(name)), []);
  const setGenre = useCallback((name: string) => dispatch(filterActions.setGenre(name)), []);
  const setCinema = useCallback((name: string) => {
    dispatch(filterActions.setCinema(name));
  }, []);

  const { data, isLoading, } = useGetCinemasQuery();

  const cinemasMap = useMemo((): Record<string, string> => {
    const result = [] as Record<string, string>;
    if (!data) return result;
    for (const cinema of data) {
      result[cinema.id] = cinema.name;
    }
    return result;
  }, [data, isLoading]);

  return (
    <div className={cl(styles.filter)}>
      <div className={cl(styles.filterInner)}>
        <h3 className={cl(styles.title)}>Фильтр поиска</h3>

        <div className={cl(styles.filters)}>
          <Input title="Название" placeholder="Введите название"
                 className={styles.filterItem}
                 setValue={setName}
          />

          <Select variants={genreEnum} title="Жанр" placeholder="Выберите жанр"
                  className={styles.filterItem}
                  setValue={setGenre}
          />

          <Select variants={cinemasMap} title="Кинотеатр" placeholder="Выберите кинотеатр"
                  className={styles.filterItem}
                  setValue={setCinema}
          />
        </div>
      </div>
    </div>
  )
}
