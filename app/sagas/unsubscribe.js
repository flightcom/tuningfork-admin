// in src/comments/commentSaga.js
import { put, takeEvery, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { showNotification } from 'react-admin';

function* unsubscribeSuccess(record) {
    yield put(showNotification('User unsubscribed'));
    // yield put(push(`/users/${record.payload.data.id}`));
    yield window.location.reload();
}

function* unsubscribeFailure({ error }) {
    yield put(showNotification('Error: user not unsubscribed', 'warning'));
    console.error(error);
}

export default function* unsubscribeSaga() {
    yield all([
        takeEvery('UNSUBSCRIBE_SUCCESS', unsubscribeSuccess),
        takeEvery('UNSUBSCRIBE_FAILURE', unsubscribeFailure),
    ]);
}
