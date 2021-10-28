import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEvents } from "../events/eventsSlice";
import { selectPeople } from "./peopleSlice";
import { selectExpenses } from "../expenses/expensesSlice";
import { generatePDF } from "../../utils/helperFunctions";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { currencies } from "../../utils/currencyData";
import SplitExpensesButton from "../../components/SplitExpensesButton";

export default function People() {
	const { eventId } = useParams();

	const events = useSelector(selectEvents);
	const allPeople = useSelector(selectPeople);
	const allExpenses = useSelector(selectExpenses);

	const event = events[eventId];
	const currencySymbol = currencies[event.currency].symbol;
	const peopleIds = event.peopleIds;
	const expensesIds = event.expensesIds;

	// extract every person that is taking part in an event
	const people = peopleIds.map(personId => allPeople[personId]);

	const savePDF = () => {
		// arguments: event name, title, tableId, fileName
		generatePDF(event.name, "People", "people", "people");
	};

	if (people.length === 0) {
		return (
			<section>
				<div className="row">
					<div className="col col-md-6 offset-md-3">
						<h2>There are no people added yet</h2>
						<p>Add a person by clicking the button below</p>
						<Link to={ROUTES.newPersonRoute(eventId)}>
							<button type="button" className="btn btn-outline-dark">
								<i className="bi bi-person-plus-fill"></i> New person
							</button>
						</Link>
					</div>
				</div>
			</section>
		);
	} else {
		return (
			<section>
				<div className="row justify-content-center">
					<div className="col-md-10">
						<h2>People</h2>
						<p>Click on a person's name to change it</p>
					</div>
				</div>
				<div className="row">
					<div className="col-auto me-auto offset-md-1">
						<Link to={ROUTES.newPersonRoute(eventId)}>
							<button type="button" className="btn btn-outline-dark btn-sm">
								<i className="bi bi-person-plus-fill"></i> New person
							</button>
						</Link>
					</div>
					<div className="col-auto">
						<div className="dropdown">
							<button
								className="btn btn-sm btn-outline-dark dropdown-toggle"
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Options
							</button>
							<ul
								className="dropdown-menu"
								aria-labelledby="dropdownMenuButton1"
							>
								<li>
									<Link to={ROUTES.newPersonRoute(eventId)} className="dropdown-item">
										Add new person
									</Link>
								</li>
								<li>
									<Link to={ROUTES.newExpenseRoute(eventId)} className="dropdown-item">
										Add new expense
									</Link>
								</li>
								<li>
									<button className="dropdown-item" onClick={savePDF}>
										Save table as PDF
									</button>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-md-1"></div>
				</div>
				<div className="row justify-content-center">
					<div className="col-md-10">
						<div className="table-responsive-md">
							<table id="people" className="table mytable caption-top table-striped align-top">
								<caption>List of people</caption>
								<thead className="thead-purple align-top">
									<tr>
										<th scope="col"></th>
										<th scope="col">Name</th>
										<th scope="col" className="custom-cell-width">Total cost</th>
										<th scope="col" className="custom-cell-width">Amount paid</th>
										<th scope="col" className="custom-cell-width">Balance</th>
										<th scope="col" className="custom-cell-width">Participates in</th>
										<th scope="col" className="custom-cell-width">Paid</th>
									</tr>
								</thead>
								<tbody>
									{people.map((person, index) => (
										<tr key={person.id}>
											<td>{`${index + 1}.`}</td>
											<td>
												<Link
													key={person.id}
													to={ROUTES.personRoute(eventId, person.id)}
												>
													{person.name}
												</Link>
											</td>
											<td>{`${person.totalExpenses.toFixed(2)} ${currencySymbol}`}</td>
											<td>{`${person.amountPaid.toFixed(2)} ${currencySymbol}`}</td>
											<td>
												{`${(person.amountPaid - person.totalExpenses).toFixed(2)} ${currencySymbol}`}
											</td>
											<td>
												{person.expensesIds
													.map((expenseId) => allExpenses[expenseId].name)
													.join(", ")}
											</td>
											<td>
												{person.paidExpensesIds
													.map((paidExpenseId) => allExpenses[paidExpenseId].name)
													.join(", ")}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{peopleIds.length >= 2 && expensesIds.length !== 0 ? (
							<SplitExpensesButton />
						) : null}
					</div>
				</div>
			</section>
		);
	}
}
