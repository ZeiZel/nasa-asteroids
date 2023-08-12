import '../styles/globals.scss';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ReactNode } from 'react';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AstroAttacks',
	description: 'Defend the planet from dangerous asteroids!',
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
	return (
		<html lang='en'>
			<body className={montserrat.className}>{children}</body>
		</html>
	);
}
