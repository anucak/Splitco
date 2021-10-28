import { currencies } from "../utils/currencyData";

export default function EventForm({
	eventId,
	duplicateNameMessage,
	validateName,
	name,
	changeName,
	currency,
	changeCurrency,
	submitEvent,
	formTitle,
	formButtonText,
}) {
	const nameChangeHandler = (e) => {
		const name = e.currentTarget.value;
		changeName(name);
		validateName(name);
	};

	const currencyChangeHandler = (e) => {
		const currency = e.currentTarget.value;
		changeCurrency(currency);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (eventId) {
			submitEvent(eventId, name, currency);
		} else {
			submitEvent(name, currency);
		}
	};

	return (
		<div className="row pt-4">
			<div className="col-md-6 offset-md-3">
				<h2>{formTitle}</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="event-name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control"
							id="event-name"
							value={name}
							onChange={nameChangeHandler}
							required
						/>
						{duplicateNameMessage ?
							<p className="warning-message">{duplicateNameMessage}</p> :
							null
						}
					</div>
					<div className="mb-2">
						<label className="form-label" htmlFor="event-currency">
							Currency
						</label>
						<select
							id="event-currency"
							onChange={currencyChangeHandler}
							className="form-select"
							aria-label="Paid by"
							value={currency}
							required
						>
							<option value="">Select currency</option>
							{Object.values(currencies).map((currency) => (
								<option key={currency.code} value={currency.code}>
									{`${currency.code} ${currency.name}`}
								</option>
							))}
						</select>
					</div>
					<button type="submit" className="btn btn-purple col-12">
						{formButtonText}
					</button>
				</form>
			</div>
		</div>
	);
}