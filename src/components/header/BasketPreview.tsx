'use client'

import BasketIcon from './BasketIcon';
import { useSelector } from 'react-redux';
import { StoreState } from '@/redux/store';
import { selectTotalProductAmount } from '@/redux/features/cart/selector';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import cl from 'classnames';
import styles from './styles.module.css'


export const BasketPreview: FunctionComponent = () => {
    const productAmount = useSelector((state: StoreState) => { return selectTotalProductAmount(state) });

    console.log('productAmount', productAmount);

    return (
        <Link className={cl(styles.cart)} href="/cart">
            {Boolean(productAmount) && <span className={cl(styles.quantity)}>{productAmount}</span>}
            <BasketIcon className={cl(styles.cartIcon)} />
        </Link>
    )
}
