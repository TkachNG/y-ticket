import styles from './styles.module.css'
import { FunctionComponent } from 'react';
import cl from 'classnames';
import Link from 'next/link';

export const Footer: FunctionComponent = () => {
  return (
    <footer className={cl(styles.footer)}>
      <div className={cl(styles.container)}>
        <Link className={cl(styles.link)} href="/faq">Вопросы-ответы</Link>
        <Link className={cl(styles.link)} href="/about">О нас</Link>
      </div>
    </footer>
  );
}
