import { Switch, Route, Redirect, useParams, NavLink, useRouteMatch, Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectEvents } from './eventsSlice';
import ROUTES from "../../app/routes";
import People from "../people/People";
import NewExpense from "../expenses/NewExpense";
import NewPerson from "../people/NewPerson";
import Expenses from "../expenses/Expenses";
import EditExpense from "../expenses/EditExpense";
import EditPerson from "../people/EditPerson";
import SuggestedPayments from "../suggestedPayments/SuggestedPayments";

export default function Event() {
    const { eventId } = useParams();

    const events = useSelector(selectEvents);
    
    // check if eventId exists in events state
    const isEvent = Object.keys(events).includes(eventId); 

    let match = useRouteMatch();
    let location = useLocation();

    if (!isEvent) {
        return (
            <Redirect to={ROUTES.eventsRoute()} />
        )
    } else {
        return (
            <section className="pb-5">
                <nav className="pb-4">
                    <ul>
                        <li>
                            <Link to={ROUTES.editEventRoute(eventId)}>   
                                <h2 className="event-title">{events[eventId].name}</h2>  
                            </Link>
                        </li>
                        <li>
                            <NavLink to={ROUTES.peopleRoute(eventId)} activeClassName="active">
                                People
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.expensesRoute(eventId)} activeClassName="active">
                                Expenses
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            
                <Switch>
                    <Route path={`${match.path}/people`}>
                        <PeopleRoutes />
                    </Route>
                    <Route path={`${match.path}/expenses`}>
                        <ExpensesRoutes />
                    </Route>
                    <Route path={`${match.path}/how-to-settle-up`}>
                        <SuggestedPayments />
                    </Route>
                </Switch>

                {location.pathname === `/events/${eventId}` ?
                    <Redirect to={ROUTES.expensesRoute(eventId)} /> : null
                }
            </section>
        )
    } 
}

function PeopleRoutes() {
	let match = useRouteMatch();

	return (
		<>
			<Switch>
				<Route path={`${match.path}/new`}>
					<NewPerson />
				</Route>
				<Route path={`${match.path}/:personId`}>
					<EditPerson />
				</Route>
				<Route path={`${match.path}`}>
					<People />
				</Route>
			</Switch>
		</>
	);
}

function ExpensesRoutes() {
	let match = useRouteMatch();

	return (
		<>
			<Switch>
				<Route path={`${match.path}/new`}>
					<NewExpense />
				</Route>
				<Route path={`${match.path}/:expenseId`}>
					<EditExpense />
				</Route>
				<Route path={`${match.path}`}>
					<Expenses />
				</Route>
			</Switch>
		</>
	);
}