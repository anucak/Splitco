import { useSelector } from "react-redux";
import { selectEvents } from "../events/eventsSlice";
import { selectExpenses } from "./expensesSlice";
import { selectPeople } from "../people/peopleSlice";
import { generatePDF } from "../../utils/helperFunctions";
import { useParams, Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { currencies } from "../../utils/currencyData";
import SplitExpensesButton from "../../components/SplitExpensesButton";

export default function Expenses() {
	const { eventId } = useParams();

	const allEvents = useSelector(selectEvents);
	const allExpenses = useSelector(selectExpenses);
	const allPeople = useSelector(selectPeople);

	const event = allEvents[eventId];
	const currencySymbolSide = currencies[event.currency].symbolSide;
	const currencySymbol = currencies[event.currency].symbol;
	let sideLeft = true;
	let sideRight = false;

	if (currencySymbolSide === "R") {
		sideLeft = false;
		sideRight = true;
	}

	const expensesIds = event.expensesIds;
	const peopleIds = event.peopleIds;

	// extract expenses from the event
	const expenses = expensesIds.map((expenseId) => allExpenses[expenseId]);
	// extract people from the event
	const people = peopleIds.map((personId) => allPeople[personId]);

	const totalAmount = () => {
		let total = 0;
		expenses.forEach((expense) => {
			total += expense.amount;
		});
		total = total.toFixed(2);
		return total;
	};

	const savePDF = () => {
		// arguments: event name, title, tableId, fileName
		generatePDF(event.name, "Expenses", "expenses", "expenses");
	};

	if (people.length === 0) {
		return (
			<section>
				<div className="row">
					<div className="col-md-6 offset-md-3">
						<h2>Add group members</h2>
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
	} else if (expenses.length === 0) {
		return (
			<section>
				<div className="row">
					<div className="col-md-6 offset-md-3">
						<h2>There are no expenses added yet</h2>
						<p>Add an expense by clicking the button below</p>
						<Link to={ROUTES.newExpenseRoute(eventId)}>
							<button type="button" className="btn btn-outline-dark">
								<i className="bi bi-cart-plus-fill"></i> New expense
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
						<h2>Expenses</h2>
						<p>Click on an expense name to edit or delete an expense</p>
					</div>
				</div>
				<div className="row">
					<div className="col-auto me-auto offset-md-1">
						<Link to={ROUTES.newExpenseRoute(eventId)}>
							<button type="button" className="btn btn-outline-dark btn-sm">
								<i className="bi bi-cart-plus-fill"></i> New expense
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
									<Link
										to={ROUTES.newPersonRoute(eventId)}
										className="dropdown-item"
									>
										Add new person
									</Link>
								</li>
								<li>
									<Link
										to={ROUTES.newExpenseRoute(eventId)}
										className="dropdown-item"
									>
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
							<table
								id="expenses"
								className="table mytable caption-top table-striped align-top text-nowrap"
							>
								<caption>List of expenses</caption>
								<thead className="thead-purple align-top">
									<tr>
										<th scope="col"></th>
										<th scope="col">Name</th>
										<th scope="col" className="custom-cell-width">
											Amount
										</th>
										<th scope="col" className="custom-cell-width">
											Paid by
										</th>
										<th scope="col" className="custom-cell-width">
											For
										</th>
										<th scope="col" className="custom-cell-width">
											Each
										</th>
									</tr>
								</thead>
								<tbody>
									{expenses.map((expense, index) => (
										<tr key={expense.id}>
											<td>{`${index + 1}.`}</td>
											<td>
												<Link
													key={expense.id}
													to={ROUTES.expenseRoute(eventId, expense.id)}
												>
													{expense.name}
												</Link>
											</td>
											<td>
												{`${
													sideLeft ? currencySymbol : ""
												}${expense.amount.toFixed(2)}${
													sideRight ? currencySymbol : ""
												}`}
											</td>
											<td>{allPeople[expense.paidBy].name}</td>
											<td>
												{expense.splitWith
													.map((person) => allPeople[person].name)
													.join(", ")}
											</td>
											<td>
												{`${
													sideLeft ? currencySymbol : ""
												}${expense.amountPerPerson.toFixed(2)}${
													sideRight ? currencySymbol : ""
												}`}
											</td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr>
										<td></td>
										<td>
											<strong>Total</strong>
										</td>
										<td>
											{`${
												sideLeft ? currencySymbol : ""
											}${totalAmount()}${
												sideRight ? currencySymbol : ""
											}`}
										</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tfoot>
							</table>
						</div>
						{peopleIds.length >= 2 ? <SplitExpensesButton /> : null}
					</div>
				</div>
			</section>
		);
	}
}
