import React from 'react';
import {
    Create,
    DateInput,
    FormTab,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextInput,
    email,
    required,
} from 'admin-on-rest';

const UserCreate = (props) => (
    <Create title="Nouvel utilisateur" {...props}>
        <TabbedForm>
            {/* Basic Informations */}
            <FormTab label="Informations">
                <TextInput label="Prénom" source="first_name" validate={required} />
                <TextInput label="Nom" source="last_name" validate={required} />
                <TextInput label="Téléphone" source="phone" />
                <TextInput label="Courriel" source="email" type="email" validate={[required, email]} />
                <DateInput label="Date de naissance" source="birth_date" validate={required} />
                <ReferenceInput label="Rôles" source="roles[0].id" reference="roles" allowEmpty>
                    <SelectInput optionText="label" />
                </ReferenceInput>
                <TextInput label="Mot de passe" source="password" type="password" />
                <TextInput label="Confirmation" source="password_confirmation" type="password" />
            </FormTab>
            {/* Address */}
            <FormTab label="Adresse">
                <TextInput label="Adresse" source="location.address" validate={required} />
                <TextInput label="Complément d'adresse" source="location.address_more" />
                <TextInput label="Code Postal" source="location.postalCode" />
                <TextInput label="Ville" source="location.city" />
                <TextInput label="Pays" source="location.country" />
            </FormTab>
        </TabbedForm>
    </Create>
);

export default UserCreate;
