import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	useRouteMatch,
} from "react-router-dom";
import ROUTES from "./routes";
import HomePage from "../components/HomePage";
import Events from "../features/events/Events";
import NewEvent from "../features/events/NewEvent";
import Event from "../features/events/Event";
import EditEvent from "../features/events/EditEvent";

export default function App() {
	return (
		<div className="content">
			<Router>
				<nav className="logo">
					<NavLink to={ROUTES.homePageRoute()} activeClassName="active">
						<h1>
							<img src="splitco_logo.png" width="200px" alt="Splitco logo"></img>
						</h1>
					</NavLink>
				</nav>
				<div className="container-fluid">
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/events">
							<EventsRoutes />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

function EventsRoutes() {
	let match = useRouteMatch();

	return (
		<>
			<Switch>
				<Route path={`${match.path}/new`}>
					<NewEvent />
				</Route>
				<Route exact path={`${match.path}/:eventId/edit`}>
					<EditEvent />
				</Route>
				<Route path={`${match.path}/:eventId`}>
					<Event />
				</Route>
				<Route path={`${match.path}`}>
					<Events />
				</Route>
			</Switch>
		</>
	);
}
