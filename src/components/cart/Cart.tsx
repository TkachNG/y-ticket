import { CartTotal } from './CartTotal'
import { FunctionComponent } from 'react';
import { MovieItem } from "@/components/movies/MovieItem";
import { MovieItemSkeleton } from "@/components/movies/MovieItemSkeleton";
import { StoreState } from "@/redux/store";
import cl from 'classnames';
import { selectProductsIds } from "@/redux/features/cart/selector";
import styles from './cart.module.css'
import { useGetMovieQuery } from "@/redux/services/movieApi";
import { useSelector } from "react-redux";

interface CartItemProps {
  movieId: string
}

const CartItem: FunctionComponent<CartItemProps> = ({ movieId }) => {
  const { data, isLoading, error } = useGetMovieQuery(movieId);
  return (<>
    {
      isLoading || error || data === undefined ?
        <MovieItemSkeleton movieId={movieId} className={styles.cartItem} canReset={true}/> :
        <MovieItem movie={data} className={styles.cartItem} canReset={true}/>
    }
  </>)
}

export const Cart = () => {
  const cartIds = useSelector((state: StoreState) => {
    return selectProductsIds(state)
  });

  return (
    <div className={cl(styles.container)}>
      {!cartIds.length ? <h1>В корзине нет товаров</h1> : ''}
      <div>
        {cartIds.map((movieId) => {
          return (<CartItem key={movieId} movieId={movieId}/>)
        })}
      </div>
      {Boolean(cartIds.length) && <CartTotal/>}
    </div>
  );
}
