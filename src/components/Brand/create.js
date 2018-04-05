import React from 'react';
import { Card } from 'material-ui/Card';
import {
    Create,
    SimpleForm,
    TextInput,
    required,
} from 'admin-on-rest';

const BrandCreate = (props) => (
    <Card style={{ margin: '2em' }}>
        <Create title="Nouvelle marque" {...props}>
            <SimpleForm>
                <TextInput label="Nom" source="name" validate={required} />
            </SimpleForm>
        </Create>
    </Card>
);

export default BrandCreate;
