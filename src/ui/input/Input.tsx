'use client'

import { ChangeEvent, FunctionComponent, ReactNode, useCallback, useEffect, useState } from "react";

import { SFPro } from "@/components/fonts";
import cl from "classnames";
import styles from './styles.module.css'
import { useDebounce } from "../../../hooks/useDebounnce";

interface Props {
  title: string,
  placeholder: string,

  value?: string,
  className: string,
  inputClassName?: string,
  setValue: (name: string) => void
  onFocus?: () => void
  onBlur?: () => void,

  children?: ReactNode
}

export const Input: FunctionComponent<Props> = ({ title, value, placeholder, className, inputClassName, setValue, onFocus, onBlur, children }) => {
  const [inputText, setSearchText] = useState('');
  const debouncedSearchTerm = useDebounce(inputText, 100);

  useEffect(() => {
    setSearchText(value || '');
  }, [value])

  const setValueStable = useCallback((text: string) => {
    setValue(text || '')
  }, []);

  useEffect(() => {
    return setValueStable(debouncedSearchTerm);
  }, [debouncedSearchTerm, setValueStable]);

  const handleChange = (event: ChangeEvent) => {
    if (!('value' in event.target)) {
      return;
    }
    setSearchText(event.target.value as string);
  };

  return (
    <div className={cl(className, styles.container)}>
      <label className={cl(styles.inputLabel, SFPro.className)}>{title}</label>
      <input type="text" placeholder={placeholder} className={cl(styles.input, inputClassName)} onFocus={onFocus} onBlur={onBlur}
             value={inputText} onChange={handleChange}/>
      {children}
    </div>
  )
}
