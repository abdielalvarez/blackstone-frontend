import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import './styles/normalize.css';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loader</div>} persistor={persistor}>  
        <AppRoutes />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
