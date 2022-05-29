import { useSelector } from "react-redux";
import { selectEvents } from "../features/events/eventsSlice";
import { Link } from "react-router-dom";
import ROUTES from "../app/routes";

export default function HomePage() {
	const events = useSelector(selectEvents);

	return (
		<section>
			<div className="row align-items-center banner">
				<div className="col">
					<h1 className="banner-text">The easiest way to split group bills.</h1>
					{Object.keys(events).length !== 0 ? (
						<div>
							<Link to={ROUTES.newEventRoute()}>
								<button className="btn btn-purple btn-lg">New event</button>
							</Link>
							<Link to={ROUTES.eventsRoute()}>
								<button className="btn btn-purple btn-lg">
									Previous events
								</button>
							</Link>
						</div>
					) : (
						<Link to={ROUTES.newEventRoute()}>
							<button className="btn btn-purple btn-lg">Start now</button>
						</Link>
					)}
				</div>
			</div>
			<div className="row py-4 instructions">
				<div className="col-md-4 py-5">
					<i className="bi bi-people-fill"></i>
					<p>1. Add group members</p>
				</div>
				<div className="col-md-4 py-5">
					<i className="bi bi-cart-fill"></i>
					<p>2. Add expenses</p>
				</div>
				<div className="col-md-4 py-5">
					<i className="bi bi-table"></i>
					<p>3. Splitco tells you how to settle up</p>
				</div>
			</div>
			<div className="features">
				<div className="row py-2">
					<div className="col-md-6 offset-md-3">
						<div className="card border-dark">
							<div className="card-body feature">
								Free and easy, no registration needed
							</div>
						</div>
					</div>
				</div>
				<div className="row py-2">
					<div className="col-md-6 offset-md-3">
						<div className="card border-dark">
							<div className="card-body feature">
								Works on every device with a browser
							</div>
						</div>
					</div>
				</div>
				<div className="row py-2">
					<div className="col-md-6 offset-md-3">
						<div className="card border-dark">
							<div className="card-body feature">
								Share expenses with the whole group or just some group members
							</div>
						</div>
					</div>
				</div>
				<div className="row py-2">
					<div className="col-md-6 offset-md-3">
						<div className="card border-dark">
							<div className="card-body feature">
								Edit or delete previously entered expenses
							</div>
						</div>
					</div>
				</div>
				<div className="row py-2">
					<div className="col-md-6 offset-md-3">
						<div className="card border-dark">
							<div className="card-body feature">
								Get detailed reports of expenses and every person's expenditure
							</div>
						</div>
					</div>
				</div>
				<div className="row py-2">
					<div className="col-md-6 offset-md-3">
						<div className="card border-dark">
							<div className="card-body feature">Save the results in PDF</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6 offset-md-3 q-a">
					<h2 className="heading-center">Why should you use Splitco?</h2>
					<p>
						Have you ever been in charge of figuring out how to split expenses
						for group gifts, group travel, etc.? Have you ever found yourself in
						that role simply because others think that you're really good at
						math? If you have, you probably know how tedious and challenging
						this task can be. Stop wasting your time and brain cells
						by using Splitco! Splitco lets you easily enter all the information
						about your group's expenses and then suggests how to split them.
					</p>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6 offset-md-3 q-a">
					<h2 className="heading-center">How to use Splitco?</h2>
					<p>
						First give your event a name and set currency. Then add all
						group members and start entering your expenses. Information about
						expenses and group members will be available to you in separate
						tables. To edit them just click on an expense or person's name. When
						you're done with adding expenses, click on a split expenses button
						and Splitco will tell you who should pay whom how much. Note that our
						calculations are based on the assumption that every expense should
						be equally shared among every person that participated in it.
					</p>
				</div>
			</div>
		</section>
	);
}
