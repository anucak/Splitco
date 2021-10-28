import { createSlice } from '@reduxjs/toolkit';
import { addPersonToEvent } from '../events/eventsSlice';

const peopleSlice = createSlice({
    name: 'people',
    initialState: {
        people: {

        }
    },
    reducers: {
        addPerson: (state, action) => {
            const { id, name } = action.payload;
            state.people[id] = {
                id: id,
                name: name,
                totalExpenses: 0,
                expensesIds: [],
                amountPaid: 0,
                paidExpensesIds: []
            }
        },
        addExpenseToPerson: (state, action) => {
            const { id, expense, expenseId } = action.payload;
            state.people[id].totalExpenses += expense;
            state.people[id].expensesIds.push(expenseId);
        },
        addAmountPaidToPerson: (state, action) => {
            const { id, amountPaid, paidId } = action.payload;
            state.people[id].amountPaid += amountPaid;
            state.people[id].paidExpensesIds.push(paidId);
        },
        changePersonName: (state, action) => {
            const { id, name } = action.payload;
            state.people[id].name = name;
        },
        changeTotalExpenses: (state, action) => {
            const { id, differenceInAmountPerPerson } = action.payload;
            state.people[id].totalExpenses += differenceInAmountPerPerson;
        },
        changeAmountPaid: (state, action) => {
            const { id, difference } = action.payload;
            state.people[id].amountPaid += difference;
        },
        removeExpenseFromPerson: (state, action) => {
            const { id, expense, expenseId } = action.payload;
            state.people[id].totalExpenses -= expense;
            state.people[id].expensesIds = state.people[id].expensesIds.filter(id => id !== expenseId);
        },
        removeAmountPaidFromPerson: (state, action) => {
            const { id, amountPaid, paidId } = action.payload;
            state.people[id].amountPaid -= amountPaid;
            state.people[id].paidExpensesIds = state.people[id].paidExpensesIds.filter(id => id !== paidId);
        },
        removePerson: (state, action) => {
            const { id } = action.payload;
            delete state.people[id];
        }
    }
});

// thunk action creator
export const submitPerson = (id, eventId, name) => {
    return (dispatch) => {
        // add personId to an event
        dispatch(addPersonToEvent({
            id: eventId,
            personId: id
        }));

        // create new person
        dispatch(peopleSlice.actions.addPerson({
            id: id,
            name: name
        }));
    }
};

export const selectPeople = state => state.people.people;

export const { addPerson, addExpenseToPerson, addAmountPaidToPerson, changePersonName, changeTotalExpenses, changeAmountPaid, removeExpenseFromPerson, removeAmountPaidFromPerson, removePerson } = peopleSlice.actions;

export default peopleSlice.reducer;