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
import { DeleteIcon } from "@/components/cart/DeleteIcon";

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
       <DeleteIcon />
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
