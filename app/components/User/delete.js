import React from 'react';
import { Delete } from 'admin-on-rest';

const UserTitle = ({ record }) => {
    return <span>Supprimer {record ? `${record.first_name} ${record.last_name} ?` : ''}</span>;
};

const UserDelete = (props) => (
    <Delete title={<UserTitle />} {...props} />
);

export default UserDelete;
