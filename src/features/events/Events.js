import { useSelector } from 'react-redux';
import { selectEvents } from './eventsSlice';
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";

export default function Events() {
    const events = useSelector(selectEvents);

    if (Object.keys(events).length === 0) {
        return (
            <section className="py-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2>No events added yet</h2>
                        <p>Add an event by clicking the button below</p>
                        <Link to={ROUTES.newEventRoute()}>
                            <button type="button" className="btn btn-outline-dark">
                                <i className="bi bi-plus"></i> New event
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <section className="py-4">
                <div className="row">
                    <div className="col-md-6 offset-md-3 center">
                        <h1>Events</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-3 my-3">
                        <Link to={ROUTES.newEventRoute()}>
                            <button type="button" className="btn btn-outline-dark">
                                <i className="bi bi-plus"></i> New event
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {Object.values(events).reverse().map((event) => (
                            <div key={event.id} className="card my-3">
                                <Link key={event.id} to={ROUTES.eventRoute(event.id)} className="text-link">
                                    <div className="card-body card-purple">
                                        <h5 className="card-title">{event.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }
}