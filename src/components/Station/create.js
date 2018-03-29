import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    required,
} from 'admin-on-rest';

export const StationCreate = (props) => (
    <Create title="Nouvelle station instrumentale" {...props}>
        <SimpleForm>
            <TextInput label="Nom" source="name" validate={required} />
            <TextInput label="Adresse" source="location.address" validate={required} />
            <TextInput label="Complément d'adresse" source="location.address_more" />
            <TextInput label="Code Postal" source="location.postalCode" validate={required} />
            <TextInput label="Ville" source="location.city" validate={required} />
            <TextInput label="Pays" source="location.country" validate={required} />
        </SimpleForm>
    </Create>
);
