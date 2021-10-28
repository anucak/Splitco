import { useSelector, useDispatch } from "react-redux";
import { selectEvents } from "./eventsSlice";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addEvent } from "./eventsSlice";
import ROUTES from "../../app/routes";
import EventForm from "../../components/EventForm";

export default function NewEvent() {
	const events = useSelector(selectEvents);
	const eventsNames = Object.values(events).map((event) => event.name);

	const [eventName, setEventName] = useState("");
	const [duplicateNameMessage, setDuplicateNameMessage] = useState("");
	const [currency, setCurrency] = useState("");

	const dispatch = useDispatch();
	const history = useHistory();

	const validateName = (name) => {
		if (eventsNames.includes(name)) {
			setDuplicateNameMessage("Another event with this name already exists.");
			return false;
		} else {
			setDuplicateNameMessage("");
			return true;
		}
	};

	const changeEventName = (newEventName) => {
		setEventName(newEventName);
	};

	const changeCurrency = (newCurrency) => {
		setCurrency(newCurrency);
	};

	const submitEvent = (eventName, currency) => {
		if (eventName.length === 0 || currency.length === 0) {
			return;
		}

		if (validateName(eventName) === false) {
			return;
		}

		const id = uuidv4();
		dispatch(addEvent({ id: id, name: eventName, currency: currency }));

		history.push(ROUTES.eventRoute(id));
	};

	return (
		<div className="pb-5">
			<EventForm
				duplicateNameMessage={duplicateNameMessage}
				validateName={validateName}
				name={eventName}
				changeName={changeEventName}
				currency={currency}
				changeCurrency={changeCurrency}
				submitEvent={submitEvent}
				formTitle="New event"
				formButtonText="Save"
			/>
		</div>
	);
}
