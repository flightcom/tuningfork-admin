import React from 'react';
import { Card } from 'material-ui/Card';
import { Delete } from 'admin-on-rest';

const StoreTitle = ({ record }) => {
    return <span>Supprimer {record ? `${record.name} ?` : ''}</span>;
};

const StoreDelete = (props) => (
    <Card style={{ margin: '2em' }}>
        <Delete title={<StoreTitle />} {...props} />
    </Card>
);

export default StoreDelete;
