import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectExpenses, deleteExpense } from "./expensesSlice";
import ROUTES from "../../app/routes";
import DeleteButton from "../../components/DeleteButton";

export default function DeleteExpense() {
    const { eventId, expenseId } = useParams();

    const expenses = useSelector(selectExpenses);
    const expense = expenses[expenseId];
    
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteFunction = () => {
        dispatch(deleteExpense(expenseId, eventId));

        history.push(ROUTES.expensesRoute(eventId));
    };

    return (
        <DeleteButton
            buttonText={"expense"}
            name={expense.name}
            deleteFunction={deleteFunction}
        />
    );
}
