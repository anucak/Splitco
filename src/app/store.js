import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import eventsReducer from '../features/events/eventsSlice';
import expensesReducer from '../features/expenses/expensesSlice';
import peopleReducer from '../features/people/peopleSlice';
import suggestedPaymentsReducer from '../features/suggestedPayments/suggestedPaymentsSlice';

const rootReducer = combineReducers({
  events: eventsReducer,
  expenses: expensesReducer,
  people: peopleReducer,
  suggestedPayments: suggestedPaymentsReducer
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer) // create a persisted reducer

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export { store, persistor };