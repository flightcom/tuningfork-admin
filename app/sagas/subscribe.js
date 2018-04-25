// in src/comments/commentSaga.js
import { put, takeEvery, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { showNotification } from 'react-admin';

function* subscribeSuccess(record) {
    yield put(showNotification('User subscribed'));
    // yield put(push(`/users/${record.payload.data.id}`));
    yield window.location.reload();
}

function* subscribeFailure({ error }) {
    yield put(showNotification('Error: user not subscribed', 'warning'));
    console.error(error);
}

export default function* subscribeSaga() {
    yield all([
        takeEvery('SUBSCRIBE_SUCCESS', subscribeSuccess),
        takeEvery('SUBSCRIBE_FAILURE', subscribeFailure),
    ]);
}
