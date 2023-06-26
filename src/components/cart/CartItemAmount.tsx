import { FunctionComponent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/redux/store";
import { cartActions } from "@/redux/features/cart";
import cl from "classnames";
import { createPortal } from "react-dom";
import { selectProductAmount } from "@/redux/features/cart/selector";
import styles from './cartItemAmount.module.css'

interface Props {
  productId: string,
  canReset?: boolean,
}

interface ResetModalProps {
  submit: () => void,
  cancel: () => void,
}

const ResetModal: FunctionComponent<ResetModalProps> = ({ submit, cancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
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

  const decrement = useCallback(() => dispatch(cartActions.decrement(productId)), [])
  const increment = useCallback(() => dispatch(cartActions.increment(productId)), [])
  const reset = useCallback(() => dispatch(cartActions.reset(productId)), [])

  const dispatch = useDispatch();

  return (
    <div className={cl(styles.container)}>
      <div className={cl(styles.counter)}>
        <button className={cl(styles.button, { [styles['button--inactive']]: productAmount === 0 })}
                onClick={() => {
                  return productAmount > 1 ? decrement() : setIsResetModalOpen(true)
                }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5 6C10.5 6.09946 10.4605 6.19484 10.3902 6.26517C10.3198 6.33549 10.2245 6.375 10.125 6.375H1.875C1.77554 6.375 1.68016 6.33549 1.60984 6.26517C1.53951 6.19484 1.5 6.09946 1.5 6C1.5 5.90054 1.53951 5.80516 1.60984 5.73484C1.68016 5.66451 1.77554 5.625 1.875 5.625H10.125C10.2245 5.625 10.3198 5.66451 10.3902 5.73484C10.4605 5.80516 10.5 5.90054 10.5 6Z"
              fill="white"/>
          </svg>

        </button>
        <span className={cl(styles.amount)}>{productAmount}</span>
        <button className={cl(styles.button, { [styles['button--inactive']]: productAmount >= 30 })}
                onClick={increment}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.5 5C9.5 5.09946 9.46049 5.19484 9.39017 5.26517C9.31984 5.33549 9.22446 5.375 9.125 5.375H5.375V9.125C5.375 9.22446 5.33549 9.31984 5.26517 9.39017C5.19484 9.46049 5.09946 9.5 5 9.5C4.90054 9.5 4.80516 9.46049 4.73484 9.39017C4.66451 9.31984 4.625 9.22446 4.625 9.125V5.375H0.875C0.775544 5.375 0.680161 5.33549 0.609835 5.26517C0.539509 5.19484 0.5 5.09946 0.5 5C0.5 4.90054 0.539509 4.80516 0.609835 4.73484C0.680161 4.66451 0.775544 4.625 0.875 4.625H4.625V0.875C4.625 0.775544 4.66451 0.680161 4.73484 0.609835C4.80516 0.539509 4.90054 0.5 5 0.5C5.09946 0.5 5.19484 0.539509 5.26517 0.609835C5.33549 0.680161 5.375 0.775544 5.375 0.875V4.625H9.125C9.22446 4.625 9.31984 4.66451 9.39017 4.73484C9.46049 4.80516 9.5 4.90054 9.5 5Z"
              fill="white"/>
          </svg>
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
