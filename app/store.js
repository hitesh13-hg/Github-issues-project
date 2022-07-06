import { createStore, applyMiddleware } from 'redux'
//import createSagaMiddleware from 'redux-saga'
import reducers from './reducers';
//import rootSaga from './components/sagas';
//const sagaMiddleware = createSagaMiddleware();
//const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducers);
//sagaMiddleware.run(rootSaga)
export default store;
