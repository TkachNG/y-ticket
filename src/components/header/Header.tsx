import styles from './styles.module.css'
import { FunctionComponent } from 'react';
import cl from 'classnames';
import Link from 'next/link';
import { BasketPreview } from './BasketPreview';

export const Header: FunctionComponent = () => {
  return (
    <header className={cl(styles.header)}>
      <div className={cl(styles.container)}>
        <Link href="/" className={cl(styles.logo)}>Билетопоиск</Link>
        <BasketPreview />
      </div>
    </header>
  );
}
