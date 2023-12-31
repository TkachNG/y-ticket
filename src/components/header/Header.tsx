import styles from './styles.module.css'
import cl from 'classnames';
import Link from 'next/link';
import { BasketPreview } from './BasketPreview';

export const Header = () => {
  return (
    <header className={cl(styles.header)}>
      <div className={cl(styles.container)}>
        <Link href="/" className={cl(styles.logo)}>Билетопоиск</Link>
        <BasketPreview/>
      </div>
    </header>
  );
}
