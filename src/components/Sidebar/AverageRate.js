export default function AverageRate({ currency }) {
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
