import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectEvents } from "./eventsSlice";
import { useState } from "react";
import { changeEvent } from "./eventsSlice";
import ROUTES from "../../app/routes";
import EventForm from "../../components/EventForm";

export default function ChangeEvent() {
    const { eventId } = useParams();

    const events = useSelector(selectEvents);

    const eventNames = Object.values(events).map((event) => event.name);
    const event = events[eventId];

    const [name, setName] = useState(event.name);
    const [duplicateNameMessage, setDuplicateNameMessage] = useState("");
    const [currency, setCurrency] = useState(event.currency);

    const dispatch = useDispatch();
    const history = useHistory();

    const validateName = (name) => {
        // second condition assures that there will be no duplicateNameMessage if the name stays the same
        if (eventNames.includes(name) && event.name !== name) {
            setDuplicateNameMessage(
                "Another event with this name already exists."
            );
            return false;
        } else {
            setDuplicateNameMessage("");
            return true;
        }
    };

    const changeName = (newName) => {
        setName(newName);
    };

    const changeCurrency = (newCurrency) => {
        setCurrency(newCurrency);
    };

    const submitEditedEvent = (eventId, name, currency) => {
        if (name.length === 0 | currency.length === 0) {
            return;
        }

        if (validateName(name) === false) {
            return;
        }

        dispatch(changeEvent(
            eventId,
            name,
            currency
        ));

        history.push(ROUTES.eventRoute(eventId));
    };

    return (
        <EventForm
            eventId={eventId}
            duplicateNameMessage={duplicateNameMessage}
            validateName={validateName}
            name={name}
            changeName={changeName}
            currency={currency}
            changeCurrency={changeCurrency}
            submitEvent={submitEditedEvent}
            formTitle="Edit event"
            formButtonText="Save changes"
        />
    );
}