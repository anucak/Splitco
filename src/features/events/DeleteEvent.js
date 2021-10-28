import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteEvent, selectEvents } from "./eventsSlice";
import ROUTES from "../../app/routes";
import DeleteButton from "../../components/DeleteButton";

export default function DeleteEvent() {
    const { eventId } = useParams();

    const events = useSelector(selectEvents);
    const event = events[eventId];

    const dispatch = useDispatch();
    const history = useHistory();

    const deleteFunction = () => {
        dispatch(deleteEvent(eventId));

        history.push(ROUTES.eventsRoute());
    };

    return (
        <DeleteButton
            buttonText={"event"}
            name={event.name}
            deleteFunction={deleteFunction}
        />
    );
}