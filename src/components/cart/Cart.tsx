import styles from './cart.module.css'
import { FunctionComponent } from 'react';
import cl from 'classnames';
import Link from 'next/link';
import { CartItem } from './CartItem'
import { CartTotal } from './CartTotal'

export const Cart: FunctionComponent = () => {
  let count = 0;
  return (
    <div>
      <div>
        for
        <CartItem />
      </div>

      <CartTotal />
    </div>
  );
}
