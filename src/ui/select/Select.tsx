'use client'

import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/ui/input/Input";
import { createPortal } from "react-dom";
import { SelectItems } from "@/ui/select/SelectItems";
import { useSelectClickOutside } from "../../../hooks/useSelectClickOutside";

import styles from './styles.module.css'
import cl from "classnames";

interface Props {

  variants: Record<string, string>
  title: string,
  placeholder: string,
  className: string,
  setValue: (name: string) => void
}

export const Select: FunctionComponent<Props> =
  ({
     title,
     placeholder,
     variants,
     className,
     setValue
   }) => {
    const selectRef = useRef(null);
    const selectItemsRef = useRef(null);

    const [selectVisible, updateSelectVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [prevSearchText, setPrevSearchText] = useState('');

    const isValueInVariants = useCallback((searchText) => {
      return Object.values(variants).includes(searchText);
    }, []);

    useSelectClickOutside(selectRef, selectItemsRef, () => {
      if (!isValueInVariants(searchText) && isValueInVariants(prevSearchText)) {
        setSearchText(prevSearchText);
      }
      updateSelectVisible(false);
      if (!searchText) setValue('');
    });

    const filteredVariants = useMemo(() => {
      const asArray = Object.entries(variants);
      const filtered = asArray.filter(([, value]) => {
        return value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      });
      return Object.fromEntries(filtered);
    }, [searchText, variants])

    const selectValue = (item) => {
      setSearchText(variants[item]);
      updateSelectVisible(false);
      setValue(item);
    }

    useEffect(() => {
      const hideScroll = () => updateSelectVisible(false);
      document.body.addEventListener("scroll", hideScroll);
      window.addEventListener("resize", hideScroll);
    }, []);

    const showSelect = () => {
      const isVariant = isValueInVariants(searchText);

      if (isVariant) {
        setPrevSearchText(searchText);
        setSearchText('');
      }

      if (!selectItemsRef.current) return;
      const rect = selectRef.current?.getBoundingClientRect();
      selectItemsRef.current.style.top = rect.y + rect.height + window.scrollY + 'px';
      selectItemsRef.current.style.left = rect.x + 'px';
      selectItemsRef.current.style.width = rect.width + 'px';
      updateSelectVisible(true);
    }

    return (
      <div className={cl(styles.select, className)} ref={selectRef}>
        <Input title={title} placeholder={placeholder}
               className={className}
               setValue={(text) => {
                 setSearchText(text);
               }}
               value={searchText}
               onFocus={showSelect}/>
        {
          createPortal(
            <SelectItems variants={filteredVariants}
                         selectItemsRef={selectItemsRef}
                         selectVisible={selectVisible}
                         selectValue={selectValue}
            />,
            document.body
          )
        }
      </div>
    )
  }
