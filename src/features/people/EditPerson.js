import { useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPeople } from "./peopleSlice";
import ROUTES from "../../app/routes";
import ChangePerson from "./ChangePerson";

export default function EditPerson() {
    const { eventId, personId } = useParams();

    const people = useSelector(selectPeople);

    // check whether personId exists in people state
    const isPerson = Object.keys(people).includes(personId);

    if (!isPerson) {
        return (
            <Redirect to={ROUTES.peopleRoute(eventId)} />
        )
    } else {
        return <ChangePerson />
    }
}