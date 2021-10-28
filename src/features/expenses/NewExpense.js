import { useSelector, useDispatch } from "react-redux";
import { selectEvents } from "../events/eventsSlice";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { submitExpense } from './expensesSlice';
import ROUTES from "../../app/routes";
import ExpenseForm from "../../components/ExpenseForm";

export default function NewExpense() {
    const { eventId } = useParams();

    const events = useSelector(selectEvents);
    const event = events[eventId];
    const peopleIds = event.peopleIds;
    console.log(peopleIds);

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("0.00");
    const [paidBy, setPaidBy] = useState("");
    const [splitWith, setSplitWith] = useState(peopleIds);
    const [splitWithFeedback, setSplitWithFeedback] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    const changeName = (newName) => {
        setName(newName);
    };

    const changeAmount = (newAmount) => {
        setAmount(newAmount);
    };

    const changePaidBy = (newPaidBy) => {
        setPaidBy(newPaidBy);
    };

    const changeSplitWith = (newSplitWith) => {
        setSplitWith(newSplitWith);
    };

    const changeSplitWithFeedback = (newSplitWithFeedback) => {
        setSplitWithFeedback(newSplitWithFeedback);
    };

    const submitNewExpense = (name, amount, paidBy, splitWith) => {
        if (name.length === 0 | amount === "0.00" | paidBy.length === 0) {
            return;
        }

        if (splitWith.length === 0) {
            changeSplitWithFeedback("Select at least one person!");
            return;
        }

        const id = uuidv4();

        dispatch(submitExpense(
            id,
            eventId,
            name,
            parseFloat(amount),
            paidBy,
            splitWith
        ));

        history.push(ROUTES.expensesRoute(eventId));
    };

    return (
        <div>
            <ExpenseForm
                eventId={eventId}
                name={name}
                changeName={changeName}
                amount={amount}
                changeAmount={changeAmount}
                paidBy={paidBy}
                changePaidBy={changePaidBy}
                splitWith={splitWith}
                changeSplitWith={changeSplitWith}
                submitExpense={submitNewExpense}
                splitWithFeedback={splitWithFeedback}
                changeSplitWithFeedback={changeSplitWithFeedback}
                formTitle="New expense"
                formButtonText="Save"
            />
        </div>
    );
}