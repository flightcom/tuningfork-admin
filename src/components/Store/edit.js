import React from 'react';
import { Card } from 'material-ui/Card';
import {
    DeleteButton,
    Edit,
    ListButton,
    SimpleForm,
    TextInput
} from 'admin-on-rest';

import { CardActions } from 'material-ui/Card';
// import AddressInput from '../Input/AddressInput';

const StoreTitle = ({ record }) => {
    return <span>{record ? record.name : ''}</span>;
};

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const StoreEditActions = ({ basePath, data }) => (
    <CardActions style={cardActionStyle}>
        <ListButton label={null} basePath={basePath} />
        <DeleteButton label={null} basePath={basePath} record={data} />
    </CardActions>
);

const StoreEdit = (props) => (
    <Card style={{ margin: '2em' }}>
        <Edit title={<StoreTitle />} actions={<StoreEditActions />} {...props}>
            <SimpleForm>
                <TextInput label="Nom" source="name" />
                <TextInput label="Adresse" source="location.address" />
                <TextInput label="Complément d'adresse" source="location.address_more" />
                <TextInput label="Code Postal" source="location.postalCode" />
                <TextInput label="Ville" source="location.city" />
                <TextInput label="Pays" source="location.country" />
            </SimpleForm>
        </Edit>
    </Card>
);

export default StoreEdit;
