import { takeEvery, put, fork, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

function* incrementWatcherSaga() {
  yield takeEvery('INCREMENT_ASYNC', asyncIncrement);
}

function* asyncIncrement() {
  yield call(delay, 1000);
  yield put({ type: 'INCREMENT' });
}

function* helloSaga() {
  console.log('Hello Sagas!');
}

export default function* rooSaga() {
  yield fork(helloSaga);
  yield fork(incrementWatcherSaga);
}
