import React from 'react';
import { Card } from 'material-ui/Card';
import {
    Create,
    SimpleForm,
    TextInput,
    required,
} from 'admin-on-rest';

const StoreCreate = (props) => (
    <Card style={{ margin: '2em' }}>
        <Create title="Nouveau store" {...props}>
            <SimpleForm>
                <TextInput label="Nom" source="name" validate={required} />
                <TextInput label="Adresse" source="location.address" validate={required} />
                <TextInput label="Complément d'adresse" source="location.address_more" />
                <TextInput label="Code Postal" source="location.postalCode" validate={required} />
                <TextInput label="Ville" source="location.city" validate={required} />
                <TextInput label="Pays" source="location.country" validate={required} />
            </SimpleForm>
        </Create>
    </Card>
);

export default StoreCreate;
