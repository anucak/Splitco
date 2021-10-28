import { useSelector, useDispatch } from "react-redux";
import { selectEvents } from "../features/events/eventsSlice";
import { selectPeople } from "../features/people/peopleSlice";
import { useParams, useHistory } from "react-router-dom";
import { settleExpenses } from "../utils/helperFunctions";
import { suggestPayments } from "../features/suggestedPayments/suggestedPaymentsSlice";
import ROUTES from "../app/routes";

export default function SplitExpensesButton() {
    const { eventId } = useParams();

    const events = useSelector(selectEvents);
    const event = events[eventId];
    const peopleIds = event.peopleIds;

    const allPeople = useSelector(selectPeople);
    const people = peopleIds.map(personId => allPeople[personId]);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = () => {
        // save array returned by settleExpenses function in a paymentSuggestions variable
        const paymentSuggestions = settleExpenses(people);
        dispatch(suggestPayments(paymentSuggestions));

        history.push(ROUTES.suggestPaymentsRoute(eventId));
    };

    return (
        <div className="btn-container">
            <button
                type="button"
                className="btn btn-purple"
                onClick={handleClick}
            >
                Split expenses
            </button>
        </div>
    );
}
