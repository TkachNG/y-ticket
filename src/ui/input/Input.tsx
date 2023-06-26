'use client'

import { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from "react";

import { SFPro } from "@/app/fonts";
import cl from "classnames";
import styles from './styles.module.css'
import { useDebounce } from "../../../hooks/useDebounnce";

interface Props {
  title: string,
  placeholder: string,

  value?: string,
  className: string,
  setValue: (name: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Input: FunctionComponent<Props> = ({ title, value, placeholder, className, setValue, onFocus, onBlur }) => {
  const [inputText, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(inputText, 500);

  useEffect(() => {
    setSearchTerm(value || '');
  }, [value])

  const setValueStable = useCallback((value: string) => {
    setValue(value)
  }, []);

  useEffect(() => {
    return setValueStable(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleChange = (event: ChangeEvent) => {
    if (!('value' in event.target)) {
      return;
    }
    setSearchTerm(event.target.value);
  };

  return (
    <div className={cl(className)}>
      <label className={cl(styles.inputLabel, SFPro.className)}>{title}</label>
      <input type="text" placeholder={placeholder} className={cl(styles.input)} onFocus={onFocus} onBlur={onBlur}
             value={inputText} onChange={handleChange}/>
    </div>
  )
}
