// @flow

import { fromJS } from 'immutable';
import { CHANGE_LOCALE, DEFAULT_LOCALE } from './actions';

import type { GenericActionType } from 'types';

const initialState = fromJS({
    locale: DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action: GenericActionType) {
    switch (action.type) {
        case CHANGE_LOCALE:
            return state.set('locale', action.payload.locale);
        default:
            return state;
    }
}

export default languageProviderReducer;
