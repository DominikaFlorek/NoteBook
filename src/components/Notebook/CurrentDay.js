import { useState, useEffect } from 'react';

export default function CurrentDay() {
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
