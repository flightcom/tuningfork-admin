// @flow

import type { InputEvent } from 'types';

export const CHANGE_LOCALE = 'app/Language/CHANGE_LOCALE';
export const DEFAULT_LOCALE = 'fr';

export function changeLocale({ target: { value: languageLocale } }: InputEvent) {
    return {
        type: CHANGE_LOCALE,
        payload: {
            locale: languageLocale,
        },
    };
}
