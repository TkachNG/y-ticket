import { FunctionComponent, useCallback, useMemo } from "react";

import { useGetCinemasQuery } from "@/redux/services/movieApi";
import { filterActions } from "@/redux/features/moviesFilter";
import { genreEnum } from "@/components/movie/genreEnum";
import { useDispatch } from "react-redux";
import { Input } from "@/ui/input/Input";
import { Select } from "@/ui/select/Select";

import styles from './filter.module.css'
import cl from "classnames";


export interface Cinema {
  id: string,
  name: string,
}

export const Filter: FunctionComponent = () => {

  const dispatch = useDispatch();

  const setName = useCallback((name: string) => dispatch(filterActions.setName(name)), [dispatch]);
  const setGenre = useCallback((name: string) => dispatch(filterActions.setGenre(name)), [dispatch]);
  const setCinema = useCallback((name: string) => {
    dispatch(filterActions.setCinema(name));
  }, [dispatch]);

  const { data } = useGetCinemasQuery({});

  const cinemasMap = useMemo((): Record<string, string> => {
    if (!data) return {} as Record<string, string>;
    const result: Record<string, string> = {};

    for (const cinema of data) {
      result[cinema.id as string] = cinema.name as string;
    }
    return result as Record<string, string>;
  }, [data]);

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
