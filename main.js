import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSafaMiddleware from 'redux-saga';

import Counter from './Counter';
import reducer from './reducers';
import rootSaga from './sagas.js';

const sagaMiddleware = createSafaMiddleware();

const enchancer = compose(
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(reducer, enchancer);

sagaMiddleware.run(rootSaga);

const action = type => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
    />,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
