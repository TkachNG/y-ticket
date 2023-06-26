'use client'

import { FunctionComponent, LegacyRef, Ref } from "react";
import styles from './styles.module.css'
import cl from "classnames";
import { SFPro } from "@/components/fonts";

interface Props {
  variants: Record<string, string>
  selectItemsRef: LegacyRef<HTMLDivElement>,

  selectVisible: boolean,
  selectValue: (item: string) => void
}

export const SelectItems: FunctionComponent<Props> =
  ({
     variants,
     selectItemsRef,
     selectVisible,
     selectValue
   }) => {
    return (<div className={cl(styles.selectItems)} ref={selectItemsRef}
                 style={{ display: selectVisible ? 'block' : 'none' }}> {
      (Object.keys(variants)).map((item) => {
        return (<div key={item} className={cl(styles.selectItem, SFPro.className)} onClick={() => {
          selectValue(item);
        }}>
          <p className={cl(styles.selectText)}>{variants[item]}</p>
        </div>)
      })
    }
    </div>);
  }
