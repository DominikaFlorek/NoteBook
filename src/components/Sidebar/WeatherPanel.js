export default function WeatherPanel({ weather }) {
	return (
		<div className='weather-panel'>
			<h2 className='heading2 sidebar-heading'>{weather.location?.name}</h2>
			<div className='weather-data'>
				<div className='weather-temp'>
					<p className='weather-current-temp'>{weather.current?.temp_c}℃</p>
					<p>Feels like: {Math.round(weather.current?.feelslike_c)}℃</p>
				</div>
				<div>
					<img src={weather.current?.condition?.icon}></img>
					<p>{weather.current?.condition.text}</p>
				</div>
				<div>
					<p>pressure: {weather.current?.pressure_mb}hPa</p>
					<p>humidity: {weather.current?.humidity}%</p>
					<p>UV Index: {weather.current?.uv}</p>
				</div>
			</div>
		</div>
	);
}
