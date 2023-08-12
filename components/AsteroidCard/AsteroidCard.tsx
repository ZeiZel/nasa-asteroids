import { FC, useState } from 'react';
import { IAsteroidCard } from './AsteroidCard.props';
import { Button, HTag } from '@/components';
import styles from './AsteroidCard.module.scss';

export const AsteroidCard: FC<IAsteroidCard> = ({
	id,
	distanceToEarth,
	name,
	size,
	hazardous,
	closestApproachDate,
	handleAddToCard,
}: IAsteroidCard) => {
	const [addedToCard, setAddedToCard] = useState<boolean>(false);

	const handler = () => {
		handleAddToCard(id);
		setAddedToCard(true);
	};

	return (
		<div className={styles.meteor}>
			<div>
				<HTag className={styles.meteor__title} tag={'h2'}>
					{name}
				</HTag>
			</div>
			<div>
				<span>{distanceToEarth}</span>
				<span>{closestApproachDate}</span>
				<span>{hazardous}</span>
				<span>{size}</span>
			</div>
			<div>
				<Button appearance={addedToCard ? 'ghost' : 'primary'} disabled={addedToCard}>
					{addedToCard ? 'Add to card' : 'Added to card'}
				</Button>
			</div>
		</div>
	);
};
