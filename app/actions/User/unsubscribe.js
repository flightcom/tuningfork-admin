import { CREATE } from 'react-admin';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export const unsubscribe = (id, data, basePath) => ({
    type: UNSUBSCRIBE,
    payload: { id },
    meta: { resource: `users/${id}/unsubscribe`, fetch: CREATE, cancelPrevious: false },
});
