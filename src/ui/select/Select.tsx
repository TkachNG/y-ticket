import { FunctionComponent, LegacyRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/ui/input/Input";
import { createPortal } from "react-dom";
import { SelectItems } from "@/ui/select/SelectItems";
import { useSelectClickOutside } from "../../../hooks/useSelectClickOutside";
import styles from './styles.module.css'
import cl from "classnames";
import { SelectArrow } from "@/ui/select/SelectArrow";

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
    const selectRef: LegacyRef<HTMLDivElement> = useRef(null);
    const selectItemsRef: LegacyRef<HTMLDivElement> = useRef(null);

    const [selectVisible, updateSelectVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [prevSearchText, setPrevSearchText] = useState('');

    const isValueInVariants = useCallback((searchText: string) => {
      return Object.values(variants).includes(searchText);
    }, [variants]);

    useSelectClickOutside(selectRef, selectItemsRef, () => {
      if (!selectVisible) return;
      if (!isValueInVariants(searchText) && (!prevSearchText || isValueInVariants(prevSearchText))) {
        setSearchText(prevSearchText);
        setPrevSearchText('');
      }
      updateSelectVisible(false);
    });

    const filteredVariants = useMemo(() => {
      const asArray = Object.entries(variants);
      const filtered = asArray.filter(([, value]) => {
        return value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      });
      return Object.fromEntries(filtered);
    }, [searchText, variants])

    useEffect(() => {
      const hideScroll = () => updateSelectVisible(false);
      document.body.addEventListener("scroll", hideScroll);
      window.addEventListener("resize", hideScroll);
    }, []);

    const selectValue = (item: string) => {
      setSearchText(variants[item]);
      updateSelectVisible(false);
      setValue(item);
    }

    const showSelect = () => {
      if (isValueInVariants(searchText)) {
        setPrevSearchText(searchText);
        setSearchText('');
      }

      if (!selectItemsRef.current || !selectRef.current) return;
      const rect = selectRef.current?.getBoundingClientRect();
      selectItemsRef.current.style.top = rect.y + rect.height + window.scrollY + 'px';
      selectItemsRef.current.style.left = rect.x + 'px';
      selectItemsRef.current.style.width = rect.width + 'px';
      updateSelectVisible(true);
    }

    return (
      <div className={cl(className)} ref={selectRef}>
        <Input title={title} placeholder={placeholder} className={className}
               setValue={(text) => {
                 setSearchText(text);
               }}
               inputClassName={styles.inputSelect}
               value={searchText}
               onFocus={showSelect}>

          <SelectArrow className={styles.inputArrow} arrowClassName={selectVisible ? styles.arrowReversed : ''}/>
        </Input>
        {
          Boolean(Object.keys(filteredVariants).length) && typeof window === "object" && createPortal(
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
