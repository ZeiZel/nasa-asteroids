import { INasaApi } from '@/api/nasa.api.interface';
import { IAsteroid } from '@/interfaces/asteroid.interface';

export default class NasaApi implements INasaApi {
	apiKey: string = process.env.NEXT_PUBLIC_API_KEY as string;
	baseUrl: string = process.env.NEXT_PUBLIC_NASA_URL as string;
	size: number;
	page: number;

	constructor(size: number, page: number) {
		this.size = size;
		this.page = page;
	}

	async getNearestAsteroids(): Promise<IAsteroid[] | null> {
		try {
			const response = await fetch(
				`${this.baseUrl}/neo/rest/v1/feed?api_key=${this.apiKey}&size=${this.size}&page=${this.page}`,
			);
			const data = await response.json();

			const asteroids: IAsteroid[] = [];

			for (const date in data.near_earth_objects) {
				const dayAsteroids = data.near_earth_objects[date];
				for (const asteroidData of dayAsteroids) {
					const asteroid: IAsteroid = {
						id: asteroidData.id,
						name: asteroidData.name,
						size: asteroidData.estimated_diameter.meters.estimated_diameter_max,
						hazardous: asteroidData.is_potentially_hazardous_asteroid,
						distanceToEarth:
							asteroidData.close_approach_data[0].miss_distance.kilometers,
						closestApproachDate:
							asteroidData.close_approach_data[0].close_approach_date,
					};
					asteroids.push(asteroid);
				}
			}

			return asteroids;
		} catch (error) {
			if (error instanceof Error) {
				console.error(`${error.message}`);
			}

			return null;
		}
	}
}
