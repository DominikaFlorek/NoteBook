import Weather from './Weather';
import Currency from './Currency';

export default function Sidebar({ currency }) {
	return (
		<div className='sidebar'>
			<Weather />
			<Currency currency={currency} />
		</div>
	);
}
