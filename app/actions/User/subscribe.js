import { CREATE } from 'admin-on-rest';
export const SUBSCRIBE = 'SUBSCRIBE';
export const subscribe = (id, data, basePath) => ({
    type: SUBSCRIBE,
    payload: { id, data },
    meta: { resource: `users/${id}/subscribe`, fetch: CREATE, cancelPrevious: false },
});
