import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const initialState = {};
const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const persistConfig = {
  key: 'root',
  storage: storage,
 };

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const pReducer = persistReducer(persistConfig, createRootReducer());
 
const store = createStore(pReducer, initialState,
  composedEnhancers
);

export const persistor = persistStore(store)
export default store;