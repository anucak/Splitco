import { useSelector, useDispatch } from "react-redux";
import { selectEvents } from "../events/eventsSlice";
import { selectPeople, submitPerson } from "./peopleSlice";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../../app/routes";
import PersonForm from "../../components/PersonForm";

export default function NewPerson() {
	const { eventId } = useParams();

	const events = useSelector(selectEvents);
	const peopleIds = events[eventId].peopleIds;

	const people = useSelector(selectPeople);
	const peopleNames = peopleIds.map((personId) => people[personId].name);

	const [name, setName] = useState("");
	const [duplicateNameMessage, setDuplicateNameMessage] = useState("");

	const dispatch = useDispatch();
	const history = useHistory();

	const validateName = (name) => {
		if (peopleNames.includes(name)) {
			setDuplicateNameMessage(
				"Another person with this name already exists."
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

	const submitName = (name) => {
		if (name.length === 0) {
			return;
		}

		if (validateName(name) === false) {
			return;
		}

		const id = uuidv4();

		dispatch(submitPerson(id, eventId, name));

		history.push(ROUTES.peopleRoute(eventId));
	};

	return (
		<div>
			<PersonForm
				duplicateNameMessage={duplicateNameMessage}
				validateName={validateName}
				name={name}
				changeName={changeName}
				submitName={submitName}
				formTitle="New person"
				formButtonText="Save"
			/>
		</div>
	);
}
