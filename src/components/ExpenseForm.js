import { useSelector } from "react-redux";
import { selectEvents } from "../features/events/eventsSlice";
import { currencies } from "../utils/currencyData";
import { selectPeople } from "../features/people/peopleSlice";

export default function ExpenseForm({
    eventId,
    expenseId,
    name,
    changeName,
    amount,
    changeAmount,
    paidBy,
    changePaidBy,
    splitWith,
    changeSplitWith,
    submitExpense,
    splitWithFeedback,
    changeSplitWithFeedback,
    formTitle,
    formButtonText,
}) {

    const events = useSelector(selectEvents);
    const event = events[eventId];

    const allPeople = useSelector(selectPeople);
    const peopleIds = event.peopleIds;
    const people = peopleIds.map(personId => allPeople[personId]);

    const currencySymbolSide = currencies[event.currency].symbolSide;
    const currencySymbol = currencies[event.currency].symbol;
    let sideLeft = true;
    let sideRight = false;

    if (currencySymbolSide === 'R') {
        sideLeft = false;
        sideRight = true;
    };

    const nameChangeHandler = (e) => {
        const name = e.currentTarget.value;
        changeName(name);
    };

    const amountClickHandler = (e) => {
        const amount = e.currentTarget.value;
        if (amount === "0.00") {
            changeAmount("");
        }
    };

    const amountChangeHandler = (e) => {
        const amount = e.currentTarget.value;
        changeAmount(amount);
    };

    const paidByChangeHandler = (e) => {
        const payedBy = e.currentTarget.value;
        changePaidBy(payedBy);
    };

    const togglePeopleToSplitExpenseWith = (e) => {
        const personId = e.currentTarget.value;

        if (splitWithFeedback !== "") {
            changeSplitWithFeedback("");
        }

        if (splitWith.includes(personId)) {
            let newSplitWith = splitWith.filter((person) => person !== personId);
            changeSplitWith(newSplitWith);
        } else {
            changeSplitWith((prev) => [...prev, personId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (expenseId) {
            submitExpense(expenseId, name, amount, paidBy, splitWith);
        } else {
            submitExpense(name, amount, paidBy, splitWith);
        }
    };

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h2>{formTitle}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="expense-name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="expense-name"
                            value={name}
                            onChange={nameChangeHandler}
                            required
                        />
                    </div>
                    <label htmlFor="expense-amount" className="form-label">
                        Amount
                    </label>
                    <div className="input-group mb-3">
                        {sideLeft ? (
                            <span class="input-group-text">{currencySymbol}</span>
                        ) : null}
                        <input
                            type="number"
                            className="form-control"
                            id="expense-amount"
                            value={amount}
                            min="0.01"
                            step="0.01"
                            onChange={amountChangeHandler}
                            onClick={amountClickHandler}
                            required
                        />
                        {sideRight ? (
                            <span class="input-group-text">{currencySymbol}</span>
                        ) : null}
                    </div>
                    <div>
                        <label className="form-label" htmlFor="expense-paid-by">
                            Paid by
                        </label>
                        <select
                            id="expense-paid-by"
                            onChange={paidByChangeHandler}
                            className="form-select"
                            aria-label="Paid by"
                            value={paidBy}
                            required
                        >
                            <option value="">Select person</option>
                            {Object.values(people).map((person) => (
                                <option key={person.id} value={person.id}>
                                    {person.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="py-3">
                        <label className="form-label">For</label>
                        {people.map((person) => (
                            <div key={person.id} className="checkbox-container">
                                {splitWith.includes(person.id) ? (
                                    <input
                                        id={person.name}
                                        name={person.name}
                                        type="checkbox"
                                        defaultChecked={person}
                                        value={person.id}
                                        onChange={togglePeopleToSplitExpenseWith}
                                    ></input>
                                ) : (
                                    <input
                                        id={person.name}
                                        name={person.name}
                                        type="checkbox"
                                        value={person.id}
                                        onChange={togglePeopleToSplitExpenseWith}
                                    ></input>
                                )}
                                <label htmlFor={person.name}>
                                    {person.name}
                                </label>
                            </div>
                        ))}
                        {splitWithFeedback ? (
                            <p className="warning-message">{splitWithFeedback}</p>
                        ) : null}
                    </div>
                    <button type="submit" className="btn btn-purple col-12">
                        {formButtonText}
                    </button>
                </form>
            </div>
        </div>
    );
}
