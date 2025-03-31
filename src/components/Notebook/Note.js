export default function Note({ description, date, done, dispatch }) {
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
						<button
							className='btn-done'
							onClick={() =>
								dispatch({ type: 'updateTask', payload: description })
							}
						>
							✔️
						</button>
					)}
					<button
						className='btn-delete'
						onClick={() =>
							dispatch({ type: 'removeTask', payload: description })
						}
					>
						✖️
					</button>
				</div>
			</li>
		</div>
	);
}
