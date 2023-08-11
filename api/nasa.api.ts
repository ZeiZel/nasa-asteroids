class NasaApi {
	apiKey: string;
	baseUrl: string = 'https://api.nasa.gov';

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	async getNearestAsteroids() {
		try {
			const response = await fetch(`${this.baseUrl}/neo/rest/v1/feed?api_key=${this.apiKey}`);
			const data = await response.json();

			const asteroids = [];

			for (const date in data.near_earth_objects) {
				const dayAsteroids = data.near_earth_objects[date];
				for (const asteroidData of dayAsteroids) {
					const asteroid = {
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
			console.error('Error fetching asteroid data:', error);
			throw error;
		}
	}
}

// Используйте ваш ключ API NASA
const apiKey = 'YOUR_NASA_API_KEY';
const nasaApi = new NasaApi(apiKey);

// Пример использования
nasaApi
	.getNearestAsteroids()
	.then((asteroids) => {
		console.log('Список ближайших астероидов:', asteroids);
	})
	.catch((error) => {
		console.error('Ошибка:', error);
	});
