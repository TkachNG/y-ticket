import styles from './cartTotal.module.css'
import { FunctionComponent } from 'react';
import cl from 'classnames';
import { useSelector } from 'react-redux';
import { selectProductAmount } from '@/redux/features/cart/selector';
import { Cart } from '@/redux/features/cart';
import { StoreState } from '@/redux/store';

export const CartTotal: FunctionComponent = () => {
  let count = 0;

  const productAmount = useSelector((state: StoreState) => { selectProductAmount(state, 123) });

  console.log("33", productAmount);

  return (
    <div>
      <p>Итого билетов:</p>

      <span>{productAmount}</span>
    </div>
  );
}
