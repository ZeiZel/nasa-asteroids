import { FC, useEffect, useState } from 'react';
import { IAsteroid } from '@/interfaces/asteroid.interface';
import NasaApi from '@/api/nasa.api';
import { AsteroidCard } from '@/components/AsteroidCard/AsteroidCard';
import styles from './AsteroidList.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const AsteroidList: FC = () => {
	const [meteorData, setMeteorData] = useState<IAsteroid[]>([]);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);
	const [asteroids, updateAsteroids, removeAsteroids] = useLocalStorage('asteroidItems', []);

	const handleAddToCard = (id: string): void => {
		updateAsteroids([...asteroids, id]);
	};

	const loadMoreAsteroids = async (): Promise<void> => {
		setLoading(true);
		const newAsteroids = await new NasaApi(10, page).getNearestAsteroids();
		if (newAsteroids) {
			setMeteorData((prevData) => [...prevData, ...newAsteroids]);
			setPage((prevPage) => prevPage + 1);
		}
		setLoading(false);
	};

	useEffect(() => {
		loadMoreAsteroids();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
				!loading
			) {
				loadMoreAsteroids();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [loading]);

	return (
		<div className={styles.meteorList}>
			<AnimatePresence>
				{meteorData.map((meteor) => (
					<motion.div
						key={meteor.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<AsteroidCard handleAddToCard={handleAddToCard} {...meteor} />
					</motion.div>
				))}
			</AnimatePresence>
			{loading && <p>Loading...</p>}
		</div>
	);
};
