import { FunctionComponent, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/redux/store";
import { cartActions } from "@/redux/features/cart";
import cl from "classnames";
import { createPortal } from "react-dom";
import { selectProductAmount } from "@/redux/features/cart/selector";
import styles from './cartItemAmount.module.css'
import { PlusIcon } from "@/components/cart/PlusIcon";
import { MinusIcon } from "@/components/cart/MinusIcon";
import { useModalClickOutside } from "../../../hooks/useModalClickOutside";

interface Props {
  productId: string,
  canReset?: boolean,
}

interface ResetModalProps {
  submit: () => void,
  cancel: () => void,
}

const ResetModal: FunctionComponent<ResetModalProps> = ({ submit, cancel }) => {
  const modalRef = useRef(null);

  useModalClickOutside(modalRef, () => {
    cancel();
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalTop}>
          <h3 className={styles.modalTitle}>Удаление билета</h3>
          <span className={styles.modalClose} onClick={() => cancel()}></span>
        </div>

        <p className={styles.modalText}>Вы уверены, что хотите удалить билет?</p>

        <div className={styles.modalButtons}>
          <button className={styles.modalButtonSubmit} onClick={() => submit()}>Да</button>
          <button className={styles.modalButtonCancel} onClick={() => cancel()}>Нет</button>
        </div>
      </div>
    </div>
  )
}

export const CartItemAmount: FunctionComponent<Props> = ({ productId, canReset = false }) => {

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const productAmount = useSelector((state: StoreState) => {
    return selectProductAmount(state, productId)
  });

  const dispatch = useDispatch();

  const decrement = useCallback(() => dispatch(cartActions.decrement(productId)), [dispatch, productId])
  const increment = useCallback(() => dispatch(cartActions.increment(productId)), [dispatch, productId])
  const reset = useCallback(() => dispatch(cartActions.reset(productId)), [dispatch, productId])

  return (
    <div className={cl(styles.container)}>
      <div className={cl(styles.counter)}>
        <button className={cl(styles.button, { [styles['button--inactive']]: productAmount === 0 })}
                onClick={() => {
                  return productAmount > 1 ? decrement() : setIsResetModalOpen(true)
                }}>
          <MinusIcon/>
        </button>
        <span className={cl(styles.amount)}>{productAmount}</span>
        <button className={cl(styles.button, { [styles['button--inactive']]: productAmount >= 30 })}
                onClick={increment}>
          <PlusIcon/>
        </button>
      </div>
      {canReset && <button className={cl(styles.reset)} onClick={() => {
        setIsResetModalOpen(true);
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.0673 15.1829C16.1254 15.241 16.1714 15.3099 16.2028 15.3858C16.2343 15.4617 16.2505 15.543 16.2505 15.6251C16.2505 15.7072 16.2343 15.7885 16.2028 15.8644C16.1714 15.9403 16.1254 16.0092 16.0673 16.0673C16.0092 16.1254 15.9403 16.1714 15.8644 16.2028C15.7885 16.2343 15.7072 16.2505 15.6251 16.2505C15.543 16.2505 15.4617 16.2343 15.3858 16.2028C15.3099 16.1714 15.241 16.1254 15.1829 16.0673L10.0001 10.8837L4.81729 16.0673C4.70002 16.1846 4.54096 16.2505 4.3751 16.2505C4.20925 16.2505 4.05019 16.1846 3.93292 16.0673C3.81564 15.95 3.74976 15.791 3.74976 15.6251C3.74976 15.4593 3.81564 15.3002 3.93292 15.1829L9.11651 10.0001L3.93292 4.81729C3.81564 4.70002 3.74976 4.54096 3.74976 4.3751C3.74976 4.20925 3.81564 4.05019 3.93292 3.93292C4.05019 3.81564 4.20925 3.74976 4.3751 3.74976C4.54096 3.74976 4.70002 3.81564 4.81729 3.93292L10.0001 9.11651L15.1829 3.93292C15.3002 3.81564 15.4593 3.74976 15.6251 3.74976C15.791 3.74976 15.95 3.81564 16.0673 3.93292C16.1846 4.05019 16.2505 4.20925 16.2505 4.3751C16.2505 4.54096 16.1846 4.70002 16.0673 4.81729L10.8837 10.0001L16.0673 15.1829Z"
            fill="#333333"/>
        </svg>
      </button>}

      {isResetModalOpen && createPortal(<ResetModal
        cancel={() => setIsResetModalOpen(false)}
        submit={() => {
          setIsResetModalOpen(false);
          reset();
        }}
      />, document.body)}
    </div>
  )
}
