import { useEffect, useState } from 'react';

import WeatherPanel from './WeatherPanel';

export default function Weather() {
	const [weather, setWeather] = useState({});
	const key = '9a2825f5602643f5854120951241902';
	const city = 'Lodz';

	useEffect(function () {
		async function fetchWeather() {
			const res = await fetch(
				`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=yes`
			);
			const data = await res.json();

			setWeather(data);
		}
		fetchWeather();
	}, []);

	return (
		<div className='weather'>
			<h2 className='heading2'>Weather</h2>
			<WeatherPanel weather={weather} />
		</div>
	);
}
