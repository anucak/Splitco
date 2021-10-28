import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectEvents } from "../events/eventsSlice";
import { selectPeople } from './peopleSlice';
import { useState } from "react";
import { changePersonName } from "./peopleSlice";
import ROUTES from "../../app/routes";
import PersonForm from "../../components/PersonForm";

export default function ChangePerson() {
	const { eventId, personId } = useParams();

	const events = useSelector(selectEvents);
	const peopleIds = events[eventId].peopleIds;

	const people = useSelector(selectPeople);
	const peopleNames = peopleIds.map((personId) => people[personId].name);
	const personName = people[personId].name;

	const [name, setName] = useState(personName);
	const [duplicateNameMessage, setDuplicateNameMessage] = useState("");

	const dispatch = useDispatch();
	const history = useHistory();

	const validateName = (name) => {
		// second condition assures that there will be no duplicateNameMessage if the name stays the same
		if (peopleNames.includes(name) && personName !== name) {
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
	}

	const submitName = (newName) => {
		if (newName.length === 0) {
			return;
		}

		if (!validateName(newName)) {
			return;
		}

		dispatch(changePersonName({ id: personId, name: newName }));

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
				formTitle="Edit name"
				formButtonText="Submit changes"
			/>
		</div>
	);
}