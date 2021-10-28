import { useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectExpenses } from "./expensesSlice";
import ROUTES from "../../app/routes";
import ChangeExpense from "./ChangeExpense";
import DeleteExpense from "./DeleteExpense";

export default function EditExpense() {
    const { eventId, expenseId } = useParams();

    const expenses = useSelector(selectExpenses);

    // check whether expenseId exists in expenses state
    const isExpense = Object.keys(expenses).includes(expenseId);

    if (!isExpense) {
        return (
            <Redirect to={ROUTES.expensesRoute(eventId)} />
        )
    } else {
        return (
            <div>
                <ChangeExpense />
                <DeleteExpense />
            </div>
        )
    }
}