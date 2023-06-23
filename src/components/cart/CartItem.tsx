import styles from './cartItem.module.css'
import { FunctionComponent } from 'react';
import cl from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductAmount } from '@/redux/features/cart/selector';
import { StoreState } from '@/redux/store';
import { cartActions } from '@/redux/features/cart';

const CartItemAmount: FunctionComponent = () => {

  const productId = 123;

  const productAmount = useSelector((state: StoreState) => {
    return selectProductAmount(state, productId)
  });

  const dispatch = useDispatch();
  
  return (
    <div>
      <button onClick={() => dispatch(cartActions.increment(productId))}>+</button>
      <span>{productAmount}</span>
      <button onClick={() => dispatch(cartActions.decrement(productId))}>-</button>
    </div>
  )
}

export const CartItem: FunctionComponent = () => {

  return (
    <div>
      <div>
        <div>
          {/* <Image /> */}
          <div>
            <p>title</p>
            <p>genre</p>
          </div>
        </div>

        <CartItemAmount />
      </div>
    </div>
  );
}
