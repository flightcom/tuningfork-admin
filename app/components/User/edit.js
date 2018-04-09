import React from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import restClient from '../../restClient';

import {
    DateInput,
    DeleteButton,
    Edit,
    FormTab,
    ListButton,
    TabbedForm,
    CheckboxGroupInput,
    ReferenceInput,
    SelectInput,
    TextInput
} from 'admin-on-rest';

import SubscribeButton from '../Buttons/SubscribeButton';
import UnsubscribeButton from '../Buttons/UnsubscribeButton';

const UserTitle = ({ record }) => {
    return <span>{record ? `${record.first_name} ${record.last_name}` : ''}</span>;
};

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const UserEditActions = ({ basePath, data }) => (
    <CardActions style={cardActionStyle}>
        <ListButton label={null} basePath={basePath} />
        {data && data.has_subscribed
            ? (
                <UnsubscribeButton basePath={basePath} record={data} />
            ) : (
                <SubscribeButton basePath={basePath} record={data} />
            )
        }
        <DeleteButton label={null} basePath={basePath} record={data} />
    </CardActions>
);

const UserEdit = (props) => (
    <Edit title={<UserTitle />} actions={<UserEditActions />} {...props}>
        <TabbedForm>
            <FormTab label="Informations">
                <TextInput label="Prénom" source="first_name" />
                <TextInput label="Nom" source="last_name" />
                <TextInput label="Téléphone" source="phone" />
                <TextInput label="Courriel" source="email" />
                <DateInput label="Date de naissance" source="birth_date" />
                <ReferenceInput label="Rôle" source="roles[0].id" reference="roles">
                    <SelectInput optionText="label" />
                </ReferenceInput>
            </FormTab>
            <FormTab label="Adresse">
                <TextInput label="Adresse" source="location.address" />
                <TextInput label="Complément d'adresse" source="location.address_more" />
                <TextInput label="Code Postal" source="location.postalCode" />
                <TextInput label="Ville" source="location.city" />
                <TextInput label="Pays" source="location.country" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default UserEdit;
