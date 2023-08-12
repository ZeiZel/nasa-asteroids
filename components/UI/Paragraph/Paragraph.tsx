import { FC } from 'react';
import { ParagraphProps } from './Paragraph.props';
import styles from './Paragraph.module.scss';

export const Paragraph: FC<ParagraphProps> = ({ children, ...props }: ParagraphProps) => {
	return (
		<p className={styles.p} {...props}>
			{children}
		</p>
	);
};
