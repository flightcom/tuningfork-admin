import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    required,
} from 'admin-on-rest';

const BrandCreate = (props) => (
    <Create title="Nouvelle marque" {...props}>
        <SimpleForm>
            <TextInput label="Nom" source="name" validate={required} />
        </SimpleForm>
    </Create>
);

export default BrandCreate;
