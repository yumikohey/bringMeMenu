import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from '../libs/middlewares/loggerMiddleware';
import reducers from '../reducers';

export default (props, railsContext) => {
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  );

  return createStore(reducer, {}, composedStore);
};