import { StoreState } from '@/redux/store';
import cl from 'classnames';
import { selectTotalProductAmount } from '@/redux/features/cart/selector';
import styles from './cart.module.css'
import { useSelector } from 'react-redux';

export const CartTotal = () => {
  const productAmount = useSelector((state: StoreState): number => {
    return selectTotalProductAmount(state)
  });

  return (
    <div className={cl(styles.cartTotalContainer)}>
      <p>Итого билетов:</p>

      <span>{productAmount}</span>
    </div>
  );
}
