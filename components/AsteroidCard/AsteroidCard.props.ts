import { IAsteroid } from '@/interfaces/asteroid.interface';

export interface IAsteroidCard extends IAsteroid {
	handleAddToCard: (id: string) => void;
}
