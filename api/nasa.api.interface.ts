import { IAsteroid } from '@/interfaces/asteroid.interface';

export interface INasaApi {
	getNearestAsteroids: () => Promise<IAsteroid[] | null>;
}
