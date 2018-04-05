import React from 'react';
import { Card } from 'material-ui/Card';
import { Delete } from 'admin-on-rest';

const UserTitle = ({ record }) => {
    return <span>Supprimer {record ? `${record.first_name} ${record.last_name} ?` : ''}</span>;
};

const UserDelete = (props) => (
    <Card style={{ margin: '2em' }}>
        <Delete title={<UserTitle />} {...props} />
    </Card>
);

export default UserDelete;
