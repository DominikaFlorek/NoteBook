import { useEffect, useState } from 'react';

import Note from './Note';

export default function Notes({ tasks, dispatch }) {
	const [description, setDescription] = useState('');
	const [sortBy, setSortBy] = useState('');

	useEffect(() => {
		if (sortBy === 'order') {
			dispatch({ type: 'sortByOrder' });
		} else {
			dispatch({ type: 'sortByDone' });
		}
	}, [sortBy]);

	function handleSubmit(e) {
		e.preventDefault();
		console.log(e);

		dispatch({
			type: 'newTask',
			payload: {
				description: description,
				date: new Date().toISOString(),
				done: false,
			},
		});
		setDescription('');
	}

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
					dispatch={dispatch}
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
