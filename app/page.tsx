import Image from 'next/image';
import { FC } from 'react';
import { AsteroidList } from '@/components';

const Home: FC = (): JSX.Element => {
	return (
		<main className={''}>
			<AsteroidList />
		</main>
	);
};

export default Home;
