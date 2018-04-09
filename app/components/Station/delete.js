import React from 'react';
import { Delete } from 'admin-on-rest';

const StationTitle = ({ record }) => {
    return <span>Supprimer {record ? `${record.name} ?` : ''}</span>;
};

const StationDelete = (props) => (
    <Delete title={<StationTitle />} {...props} />
);

export default StationDelete;
