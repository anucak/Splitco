import { useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEvents } from "./eventsSlice";
import ROUTES from "../../app/routes";
import ChangeEvent from "./ChangeEvent";
import DeleteEvent from "./DeleteEvent";

export default function EditEvent() {
    const { eventId } = useParams();

    const events = useSelector(selectEvents);

    // check if eventId exists in events state
    const isEvent = Object.keys(events).includes(eventId); 

    if (!isEvent) {
        return (
            <Redirect to={ROUTES.eventsRoute()}/>
        );
    } else {
        return (
            <div className="pb-5">
                <ChangeEvent />  
                <DeleteEvent /> 
            </div> 
        );
    }
}