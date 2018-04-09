import React from 'react';
import { Delete } from 'admin-on-rest';

const StoreTitle = ({ record }) => {
    return <span>Supprimer {record ? `${record.name} ?` : ''}</span>;
};

const StoreDelete = (props) => (
    <Delete title={<StoreTitle />} {...props} />
);

export default StoreDelete;
