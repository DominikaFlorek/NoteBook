import { useEffect, useState } from 'react';

import AverageRate from './AverageRate';

export default function Currency() {
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
