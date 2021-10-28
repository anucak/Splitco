import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectExpenses } from './expensesSlice';
import { useState } from "react";
import { changeExpense } from './expensesSlice';
import ROUTES from "../../app/routes";
import ExpenseForm from "../../components/ExpenseForm";

export default function ChangeExpense() {
    const { eventId, expenseId } = useParams();

    const expenses = useSelector(selectExpenses);
    const expense = expenses[expenseId];

    const [name, setName] = useState(expense.name);
    const [amount, setAmount] = useState(expense.amount.toFixed(2));
    const [paidBy, setPaidBy] = useState(expense.paidBy);
    const [splitWith, setSplitWith] = useState(expense.splitWith);
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

    const submitEditedExpense = (expenseId, name, amount, paidBy, splitWith) => {
        if (name.length === 0 | amount === "0.00" | paidBy.length === 0) {
            return;
        }

        if (splitWith.length === 0) {
            changeSplitWithFeedback("Select at least one person!");
            return;
        }

        dispatch(changeExpense(
            expenseId,
            name,
            parseFloat(amount),
            paidBy,
            splitWith
        ));

        history.push(ROUTES.expensesRoute(eventId));
    };

    return (
        <ExpenseForm
            eventId={eventId}
            expenseId={expenseId}
            name={name}
            changeName={changeName}
            amount={amount}
            changeAmount={changeAmount}
            paidBy={paidBy}
            changePaidBy={changePaidBy}
            splitWith={splitWith}
            changeSplitWith={changeSplitWith}
            splitWithFeedback={splitWithFeedback}
            changeSplitWithFeedback={changeSplitWithFeedback}
            submitExpense={submitEditedExpense}
            formTitle="Edit expense"
            formButtonText="Save changes"
        />
    );
}