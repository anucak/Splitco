import { createSlice } from '@reduxjs/toolkit';
import { removeExpense } from '../expenses/expensesSlice';
import { removePerson } from '../people/peopleSlice';

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: {

        }
    },
    reducers: {
        addEvent: (state, action) => {
            const { id, name, currency } = action.payload;
            state.events[id] = {
                id: id,
                name: name,
                peopleIds: [],
                expensesIds: [],
                currency: currency
            }
        },
        addPersonToEvent: (state, action) => {
            const { id, personId } = action.payload;
            state.events[id].peopleIds.push(personId);
        },
        addExpenseToEvent: (state, action) => {
            const { id, expenseId } = action.payload;
            state.events[id].expensesIds.push(expenseId);
        },
        changeEventName: (state, action) => {
            const { id, name } = action.payload;
            state.events[id].name = name;
        },
        changeEventCurrency: (state, action) => {
            const { id, currency } = action.payload;
            state.events[id].currency = currency;
        },
        removeExpenseFromEvent: (state, action) => {
            const { id, expenseId } = action.payload;
            state.events[id].expensesIds = state.events[id].expensesIds.filter(id => id !== expenseId);
        },
        removeEvent: (state, action) => {
            const { id } = action.payload;
            delete state.events[id];
        }
    }
});

// thunk action creators
export const changeEvent = (id, name, currency) => {
    return (dispatch, getState) => {
        const { events } = getState().events;

        // change event name
        if (events[id].name !== name) {
            dispatch(eventsSlice.actions.changeEventName({
                id: id,
                name: name
            }));
        }

        // change currency
        if (events[id].currency !== currency) {
            dispatch(eventsSlice.actions.changeEventCurrency({
                id: id,
                currency: currency
            }));
        }
    }
};

export const deleteEvent = (id) => {
    return (dispatch, getState) => {
        const { events } = getState().events;
        const event = events[id];

        // remove all expenses from this event
        event.expensesIds.forEach((expenseId) => {
            dispatch(removeExpense({
                id: expenseId
            }))
        });

        // remove every person from this event
        event.peopleIds.forEach((personId) => {
            dispatch(removePerson({
                id: personId
            }))
        });

        // remove event 
        dispatch(eventsSlice.actions.removeEvent({
            id: id
        }));
    }
};

export const selectEvents = state => state.events.events;

export const { addEvent, addPersonToEvent, addExpenseToEvent, changeEventName, changeEventCurrency, removeExpenseFromEvent, removeEvent } = eventsSlice.actions;

export default eventsSlice.reducer;