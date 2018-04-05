import React from 'react';
import { Card } from 'material-ui/Card';
import { Delete } from 'admin-on-rest';

const StationTitle = ({ record }) => {
    return <span>Supprimer {record ? `${record.name} ?` : ''}</span>;
};

const StationDelete = (props) => (
    <Card style={{ margin: '2em' }}>
        <Delete title={<StationTitle />} {...props} />
    </Card>
);

export default StationDelete;
