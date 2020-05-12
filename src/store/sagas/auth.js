import { put, delay, call } from 'redux-saga/effects';
import axios from '../../axios-liens';
import * as actions from '../actions/index';

export function* logoutSaga() {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
  };
  let endpoint = '/login';
  let method = 'post';
  if (action.isSignUp) {
    endpoint = '/signup';
    method = 'put';
  }
  try {
    const res = yield call(axios[method], endpoint, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield call([localStorage, 'setItem'], 'token', res.data.token);
    yield call([localStorage, 'setItem'], 'expirationDate', expirationDate);
    yield call([localStorage, 'setItem'], 'userId', res.data.userId);
    yield put(actions.authSuccess(res.data.token, res.data.userId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem('expirationDate')
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
