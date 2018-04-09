import React from 'react';
import {
    Create,
    SimpleForm,
    DateInput,
    required,
} from 'admin-on-rest';

const SubscriptionCreate = (props) => (
    <Create title="Nouvelle souscription" {...props}>
        <SimpleForm>
            <DateInput label="Date de début" source="start_date" validate={required} />
        </SimpleForm>
    </Create>
);

export default SubscriptionCreate;
