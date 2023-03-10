import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import Footer from './components/Footer';
import { store, persistor } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';

const withFooter = WrappedComponent => () => [
  <WrappedComponent key="1" />,
  <Footer key="2" />
];

const Wrapper = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

const WrapperWithFooter = withFooter(Wrapper);

ReactDOM.render(
  <React.StrictMode>
    <WrapperWithFooter />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
