import React from 'react';
import { TextInput } from 'react-admin';

// const AddressInput = () => (
//     <TextInput label="Adresse" source="location.address" />,
//     <TextInput label="Complément d'adresse" source="location.address_more" />,
//     <TextInput label="Code Postal" source="location.postalCode" />,
//     <TextInput label="Ville" source="location.city" />,
//     <TextInput label="Pays" source="location.country" />
// );
// export default AddressInput;


import { Field } from 'redux-form';

const AddressInput = () => (
    <Field name="location.address" component="input" type="text" placeholder="Adresse" />
);

export default AddressInput;
