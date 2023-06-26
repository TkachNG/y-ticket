'use client'

import { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from './styles.module.css'
import { Input } from "@/ui/input/Input";
import cl from "classnames";
import { createPortal } from "react-dom";
import { SFPro } from "@/app/fonts";
import { it } from "node:test";
import {
  validateLocalFontFunctionCall
} from "next/dist/compiled/@next/font/dist/local/validate-local-font-function-call";

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
    const select = useRef(null);
    const selectItems = useRef(null);

    const [selectVisible, updateSelectVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
      const hideScroll = () => updateSelectVisible(false);
      document.body.addEventListener("scroll", hideScroll);
      window.addEventListener("resize", hideScroll);
    }, []);

    useEffect(() => {
      console.log(selectItems.current.addEventListener('click', () => {
        // setValue(item);
        // setSelectedValue(variants[item]);
      }));


    }, [selectItems.current])

    const showSelect = () => {
      if (!selectItems.current) return;
      const rect = select.current?.getBoundingClientRect();
      selectItems.current.style.top = rect.y + rect.height + window.scrollY + 'px';
      selectItems.current.style.left = rect.x + 'px';
      selectItems.current.style.width = rect.width + 'px';
      updateSelectVisible(true);
    }

    return (
      <div className={cl(styles.select, className)} ref={select}>
        <Input title={title} placeholder={placeholder} className={className} setValue={setValue} value={selectedValue}
               onFocus={showSelect}
               onBlur={() => updateSelectVisible(false)}
        />

        {createPortal(
          <div className={cl(styles.selectItems)} ref={selectItems}
               style={{ display: selectVisible ? 'block' : 'none' }}> {
            (Object.keys(variants)).map((item) => {
              return (
                <div key={item} className={cl(styles.selectItem, SFPro.className)} onClick={() => {
                  console.log(333);
                  selectValue(item);
                }}>
                  <p className={cl(styles.selectText)} onClick={() => {
                    console.log(333);
                    selectValue(item);
                  }}>{variants[item]}</p>
                </div>
              )
            })
          }
          </div>, document.body)
        }
      </div>
    )
  }
