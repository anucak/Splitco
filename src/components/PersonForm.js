export default function PersonForm({
	duplicateNameMessage,
	validateName,
	name,
	changeName,
	submitName,
	formTitle,
	formButtonText,
}) {
	const nameChangeHandler = (e) => {
		const name = e.currentTarget.value;
		changeName(name);
		validateName(name);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submitName(name);
	};

	return (
		<div className="row">
			<div className="col-md-6 offset-md-3">
				<h2>{formTitle}</h2>
				<form onSubmit={handleSubmit}>
					<div className="pb-2">
						<label htmlFor="person-name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control"
							id="person-name"
							value={name}
							onChange={nameChangeHandler}
							required
						/>
						{duplicateNameMessage ?
							<p className="warning-message">{duplicateNameMessage}</p> :
							null
						}
					</div>
					<button type="submit" className="btn btn-purple col-12">
						{formButtonText}
					</button>
				</form>
			</div>
		</div>
	);
}
