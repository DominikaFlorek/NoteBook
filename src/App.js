import { useEffect, useState } from 'react';
import './App.css';

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

// const tasksArray = [
// 	{
// 		description: 'Learn React',
// 		date: `${day}/${month + 1}/${year}`,
// 		done: true,
// 	},
// 	{
// 		description: 'Read a book',
// 		date: `${day}/${month + 1}/${year}`,
// 		done: false,
// 	},
// 	{ description: 'Go to the meeting', date: '1/1/2024', done: true },
// 	{ description: 'Call to friend', date: `10/2/2024`, done: false },
// 	{ description: 'Water the plants', date: `14/2/2024`, done: false },
// ];

export default function App() {
	return (
		<div className='App'>
			<Logo />
			<Notebook />
		</div>
	);
}

function Logo() {
	return (
		<div className='logo'>
			<h1>NoteBook</h1>
			<CurrentDay />
		</div>
	);
}

function CurrentDay() {
	const [time, setTime] = useState(new Date());

	useEffect(function () {
		setInterval(() => setTime(new Date()), 1000);
	}, []);

	return (
		<h1>
			{time
				.toLocaleString(undefined, {
					dateStyle: 'short',
					timeStyle: 'medium',
				})
				.replaceAll('.', '/')}
		</h1>
	);
}

function Notebook() {
	// const [tasks, setTasks] = useState([...tasksArray]);
	const rowTasks = window.localStorage.getItem('tasks');
	const taskLocalStorage = rowTasks ? JSON.parse(rowTasks) : [];
	const [tasks, setTasks] = useState(taskLocalStorage);
	const [sortBy, setSortBy] = useState('');

	function handleSortTasks() {
		if (sortBy === 'order') {
			setTasks(
				tasks
					.slice()
					.sort(
						(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
					)
			);
		}

		if (sortBy === 'done') {
			setTasks(tasks.slice().sort((a, b) => a.done - b.done));
			console.log(tasks);
		}
	}

	function handleLocalStorage(tasks) {
		window.localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function handleAddTasks(task) {
		setTasks((tasks) => [...tasks, task]);
		console.log(tasks);

		handleLocalStorage([...tasks, task]);
	}

	function handleTaskUpdate(dataToUpdate) {
		tasks[dataToUpdate.index] = dataToUpdate.task;

		setTasks([...tasks]);
		handleLocalStorage([...tasks]);
	}

	function handleTaskRemove(taskToRemove) {
		const filteredTasks = [
			...tasks.filter((task) => task.description !== taskToRemove.description),
		];
		setTasks(filteredTasks);
		handleLocalStorage(filteredTasks);
	}

	return (
		<div className='notebook'>
			<Notes
				tasks={tasks}
				setTasks={setTasks}
				onAddTasks={handleAddTasks}
				onTaskUpdate={handleTaskUpdate}
				onTaskRemove={handleTaskRemove}
				onSortTasks={handleSortTasks}
				setSortedTasks={handleSortTasks}
				setSortBy={setSortBy}
			/>
			<Sidebar />
		</div>
	);
}

function Notes({
	onAddTasks,
	tasks,
	setTasks,
	onSortTasks,
	onTaskUpdate,
	onTaskRemove,
	sortBy,
	setSortBy,
}) {
	const [description, setDescription] = useState('');

	function handleSubmit(e) {
		e.preventDefault();

		if (!description) return;

		const newTask = {
			description,
			date: new Date().toISOString(),
			done: false,
		};

		onAddTasks(newTask);

		console.log(newTask);

		setDescription('');
	}

	useEffect(
		function () {
			onSortTasks();
		},
		[sortBy]
	);

	// Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.

	return (
		<div className='notes'>
			<h2 className='heading2'>Notes</h2>
			<form className='form' onSubmit={handleSubmit}>
				<input
					className='input'
					type='text'
					placeholder='Type note...'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></input>
				<button className='btnAdd'>Add</button>
			</form>
			{tasks.map((task, index) => (
				<Note
					onTaskUpdate={() =>
						onTaskUpdate({
							task: { ...task, done: true },
							index,
						})
					}
					onTaskRemove={() => onTaskRemove(task)}
					description={task.description}
					date={task.date}
					done={task.done}
					key={task.description}
				/>
			))}
			{tasks.length > 0 && (
				<select
					className='selectBtn'
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
				>
					<option value={'order'}>Sorted by input order</option>
					<option value={'done'}>Sorted by done</option>
				</select>
			)}
		</div>
	);
}

function Note({ description, date, done, onTaskUpdate, onTaskRemove }) {
	return (
		<div className='note'>
			<li className='list'>
				<div className='task-info'>
					<p style={done ? { textDecoration: 'line-through' } : {}}>
						{description}
					</p>
					<p className='task-date'>
						{' '}
						{new Date(date)
							.toLocaleString(undefined, { dateStyle: 'short' })
							.replaceAll('.', '/')}
					</p>
				</div>

				<div className='list-btns'>
					{!done && (
						<button className='btn-done' onClick={onTaskUpdate}>
							✔️
						</button>
					)}
					<button className='btn-delete' onClick={onTaskRemove}>
						✖️
					</button>
				</div>
			</li>
		</div>
	);
}

// - tu jest sidebar
// -
// -
// -
// -

function Sidebar() {
	return (
		<div className='sidebar'>
			<Weather />
			<Currency />
		</div>
	);
}

function Weather() {
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

function WeatherPanel({ weather }) {
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

function Currency() {
	const [currency, setCurrency] = useState({});
	const key = 'fca_live_mpg4nHFSCQyJ0gJu3zgWIOMcDONKyTbn0VffpvhE';
	const baseCurrency = 'PLN';

	useEffect(function () {
		async function fetchCurrency() {
			const res = await fetch(
				`https://api.freecurrencyapi.com/v1/latest?base_currency=${baseCurrency}&apikey=${key}`
			);
			const data = await res.json();
			setCurrency(data);
		}

		fetchCurrency();
	}, []);

	return (
		<div className='currency'>
			<h2 className='heading2'>Currency</h2>
			<AverageRate currency={currency} />
		</div>
	);
}

function AverageRate({ currency }) {
	return (
		<div className='currency-data'>
			<h2 className='heading2 sidebar-heading'>
				Current average exchange rate
			</h2>
			<p> 1 EUR = {(1 / currency.data?.EUR).toFixed(2)} PLN</p>
			<p> 1 USD = {(1 / currency.data?.USD).toFixed(2)} PLN</p>
			<p> 1 GBP = {(1 / currency.data?.GBP).toFixed(2)} PLN</p>
		</div>
	);
}
