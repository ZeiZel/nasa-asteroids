import { FC } from 'react';
import { IHTagProps } from './HTag.props';
import styles from './HTag.module.scss';

export const HTag: FC<IHTagProps> = ({ tag, children }: IHTagProps) => (
	<>
		{tag === 'h1' && <h1 className={styles.h1}>{children}</h1>}
		{tag === 'h2' && <h2 className={styles.h2}>{children}</h2>}
		{tag === 'h3' && <h3 className={styles.h3}>{children}</h3>}
	</>
);
