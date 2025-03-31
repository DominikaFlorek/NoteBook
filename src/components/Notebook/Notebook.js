import { useState, useReducer } from 'react';

import Notes from './Notes';
import Sidebar from '../Sidebar/Sidebar';

export default function Notebook() {
	const rawTasks = window.localStorage.getItem('tasks');
	const taskLocalStorage = rawTasks ? JSON.parse(rawTasks) : [];

	function handleLocalStorage(tasks) {
		window.localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function sortTasks(tasks, sortBy) {
		if (sortBy === 'done') {
			return tasks.slice().sort((a, b) => a.done - b.done);
		} else {
			return tasks
				.slice()
				.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
				);
		}
	}

	const inititalState = {
		tasks: taskLocalStorage,
		sortBy: 'order',
	};

	function reducer(state, action) {
		switch (action.type) {
			case 'start':
				return { ...state };
			case 'newTask':
				handleLocalStorage([...state.tasks, action.payload]);
				const sortedTasks = sortTasks(
					[...state.tasks, action.payload],
					state.sortBy
				);
				return {
					...state,
					tasks: sortedTasks,
				};
			case 'updateTask':
				const taskToUpdate = state.tasks.find(
					(task) => task.description === action.payload
				);

				taskToUpdate.done = true;
				handleLocalStorage([...state.tasks]);

				return {
					...state,
					tasks: sortTasks([...state.tasks], state.sortBy),
				};
			case 'removeTask':
				const filteredTasks = [
					...state.tasks.filter((task) => task.description !== action.payload),
				];

				handleLocalStorage(filteredTasks);
				return { ...state, tasks: filteredTasks };
			case 'sortByOrder':
				const tasksSortedByOrder = sortTasks(state.tasks, 'order');

				return { ...state, tasks: tasksSortedByOrder, sortBy: 'order' };
			case 'sortByDone':
				const tasksSortedByDone = sortTasks(state.tasks, 'done');
				return { ...state, tasks: tasksSortedByDone, sortBy: 'done' };
			default:
				throw new Error('error');
		}
	}

	const [{ tasks }, dispatch] = useReducer(reducer, inititalState);

	return (
		<div className='notebook'>
			<Notes tasks={tasks} dispatch={dispatch} />
			<Sidebar />
		</div>
	);
}
