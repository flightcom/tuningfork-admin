// @flow

import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = () => (state) => state.get('language');

/**
 * Select the language locale
 */

const selectLocale = () => createSelector(selectLanguage(), (substate) => substate.get('locale'));

export { selectLanguage, selectLocale };
