'use client'

import BasketIcon from './BasketIcon';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import { StoreState } from '@/redux/store';
import cl from 'classnames';
import { selectTotalProductAmount } from '@/redux/features/cart/selector';
import styles from './styles.module.css'
import { useSelector } from 'react-redux';

export const BasketPreview: FunctionComponent = () => {
  const productAmount = useSelector((state: StoreState) => {
    return selectTotalProductAmount(state)
  });

  return (
    <Link className={cl(styles.cart)} href="/cart">
      {Boolean(productAmount) && <span className={cl(styles.quantity)}>{productAmount}</span>}
      <BasketIcon className={cl(styles.cartIcon)}/>
    </Link>
  )
}
