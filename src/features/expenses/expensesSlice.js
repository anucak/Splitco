import { createSlice } from '@reduxjs/toolkit';
import { addExpenseToEvent, removeExpenseFromEvent } from '../events/eventsSlice';
import { addExpenseToPerson, addAmountPaidToPerson, changeTotalExpenses, changeAmountPaid, removeExpenseFromPerson, removeAmountPaidFromPerson } from '../people/peopleSlice';
import { areArrayElementsEqual, compareArrays } from '../../utils/helperFunctions';

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        expenses: {

        }
    },
    reducers: {
        addExpense: (state, action) => {
            const { id, name, amount, paidBy, splitWith, amountPerPerson } = action.payload;
            state.expenses[id] = {
                id: id,
                name: name,
                amount: amount,
                paidBy: paidBy,
                splitWith: splitWith,
                amountPerPerson: amountPerPerson
            }
        },
        changeExpenseName: (state, action) => {
            const { id, name } = action.payload;
            state.expenses[id].name = name;
        },
        changeAmount: (state, action) => {
            const { id, amount } = action.payload;
            state.expenses[id].amount = amount;
        },
        changePaidBy: (state, action) => {
            const { id, paidBy } = action.payload;
            state.expenses[id].paidBy = paidBy;
        },
        changeSplitWith: (state, action) => {
            const { id, splitWith } = action.payload;
            state.expenses[id].splitWith = splitWith;
        },
        changeAmountPerPerson: (state, action) => {
            const { id, amountPerPerson } = action.payload;
            state.expenses[id].amountPerPerson = amountPerPerson;
        },
        removeExpense: (state, action) => {
            const { id } = action.payload;
            delete state.expenses[id];
        }
    }
})

// thunk action creators

export const submitExpense = (id, eventId, name, amount, paidBy, splitWith) => {
    return (dispatch) => {
        // add expenseId to an event
        dispatch(addExpenseToEvent({
            id: eventId,
            expenseId: id
        }));

        // add amount to a person who paid for the expense
        dispatch(addAmountPaidToPerson({
            id: paidBy,
            amountPaid: amount,
            paidId: id
        }));

        // create splitWithNum and amountPerPerson
        const splitWithNum = splitWith.length;
        const amountPerPerson = amount / splitWithNum;

        // add amountPerPerson to every person that participates in an expense
        splitWith.forEach((person) => {
            dispatch(addExpenseToPerson({
                id: person,
                expense: amountPerPerson,
                expenseId: id
            }))
        });

        // create new expense 
        dispatch(expensesSlice.actions.addExpense({
            id: id,
            name: name,
            amount: amount,
            paidBy: paidBy,
            splitWith: splitWith,
            amountPerPerson: amountPerPerson
        }));
    }
};

export const changeExpense = (id, name, amount, paidBy, splitWith) => {
    return (dispatch, getState) => {
        // get expenses slice from state
        const { expenses } = getState().expenses;

        // change expense name
        if (expenses[id].name !== name) {
            dispatch(expensesSlice.actions.changeExpenseName({
                id: id,
                name: name
            }));
        }

        // change paidBy
        if (expenses[id].paidBy !== paidBy) {
            // remove previous amount from the person who previously paid the expense
            dispatch(removeAmountPaidFromPerson({
                id: expenses[id].paidBy,
                amountPaid: expenses[id].amount,
                paidId: expenses[id].id
            }));
            // add new amount (or old if left unchanged) to new person who paid the expense
            dispatch(addAmountPaidToPerson({
                id: paidBy,
                amountPaid: amount,
                paidId: id
            }));
            // change paidBy in expenses slice
            dispatch(expensesSlice.actions.changePaidBy({
                id: id,
                paidBy: paidBy
            }));
        }

        // change amount or splitWith
        if (expenses[id].amount !== amount || !areArrayElementsEqual(expenses[id].splitWith, splitWith)) {
            // calculate newAmountPerPerson and differenceInAmountPerPerson
            // amountPerPerson will change even if just amount or just length of splitWith changes
            const newAmountPerPerson = amount / splitWith.length;
            const oldAmountPerPerson = expenses[id].amountPerPerson;
            const differenceInAmountPerPerson = newAmountPerPerson - oldAmountPerPerson;

            // change amountPerPerson in expenses slice
            dispatch(expensesSlice.actions.changeAmountPerPerson({
                id: id,
                amountPerPerson: newAmountPerPerson
            }));

            if (!areArrayElementsEqual(expenses[id].splitWith, splitWith)) {
                // compare new and previous splitWith array
                const { sameValues, newValues, missingValues } = compareArrays(expenses[id].splitWith, splitWith);

                // change totalExpenses for every person in sameValues array 
                sameValues.forEach((person) => {
                    dispatch(changeTotalExpenses({
                        id: person,
                        differenceInAmountPerPerson: differenceInAmountPerPerson
                    }));
                });

                // add expense to every person in newValues array
                newValues.forEach((person) => {
                    dispatch(addExpenseToPerson({
                        id: person,
                        expense: newAmountPerPerson,
                        expenseId: id
                    }));
                })

                // remove expense from every person in missingValues array
                missingValues.forEach((person) => {
                    dispatch(removeExpenseFromPerson({
                        id: person,
                        expense: oldAmountPerPerson,
                        expenseId: id
                    }));
                })

                // change splitWith in expenses slice
                dispatch(expensesSlice.actions.changeSplitWith({
                    id: id,
                    splitWith: splitWith,
                }))
            }

            if (expenses[id].amount !== amount) {
                // change amountPaid to a person who paid the expense
                if (expenses[id].paidBy === paidBy) {
                    const difference = amount - expenses[id].amount;
                    dispatch(changeAmountPaid({
                        id: expenses[id].paidBy,
                        difference: difference
                    }));
                }

                // for every person in splitWith arraychange totalExpenses
                if (areArrayElementsEqual(expenses[id].splitWith, splitWith)) {
                    splitWith.forEach((person) => {
                        dispatch(changeTotalExpenses({
                            id: person,
                            differenceInAmountPerPerson: differenceInAmountPerPerson
                        }));
                    });
                }

                // change amount in expenses slice
                dispatch(expensesSlice.actions.changeAmount({
                    id: id,
                    amount: amount
                }));
            }
        }
    }
};

export const deleteExpense = (id, eventId) => {
    return (dispatch, getState) => {
        // get expenses slice from state
        const { expenses } = getState().expenses;

        // remove amount from a person who paid
        dispatch(removeAmountPaidFromPerson({
            id: expenses[id].paidBy,
            amountPaid: expenses[id].amount,
            paidId: expenses[id].id
        }));

        // remove expense from every person participating in it
        expenses[id].splitWith.forEach((person) => {
            dispatch(removeExpenseFromPerson({
                id: person,
                expense: expenses[id].amountPerPerson,
                expenseId: id
            }))
        });

        // remove expense from an event
        dispatch(removeExpenseFromEvent({
            id: eventId,
            expenseId: id
        }));

        // remove expense from expenses slice
        dispatch(expensesSlice.actions.removeExpense({
            id: id
        }));
    }
};

export const selectExpenses = state => state.expenses.expenses;

export const { addExpense, changeExpenseName, changeAmount, changePaidBy, changeSplitWith, changeAmountPerPerson, removeExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
