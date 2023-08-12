import { FC } from 'react';
import { ButtonProps } from '@/components/UI/Button/Button.props';
import { motion } from 'framer-motion';
import cn from 'classnames';
import styles from './Button.module.scss';

export const Button: FC<ButtonProps> = ({ appearance, children, ...props }: ButtonProps) => {
	return (
		<motion.button
			className={cn(styles.button, {
				[styles.primary]: appearance === 'primary',
				[styles.ghost]: appearance === 'ghost',
			})}
			whileHover={{ scale: 1.05 }}
			{...props}
		>
			{children}
		</motion.button>
	);
};
