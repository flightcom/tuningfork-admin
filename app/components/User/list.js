import React from 'react';
import { CardActions } from 'material-ui/Card';
import {
    BooleanInput,
    CreateButton,
    Datagrid,
    EditButton,
    EmailField,
    Filter,
    List,
    RefreshButton,
    TextField,
    TextInput,
} from 'react-admin';

import colors from 'styles/colors';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const UserListActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter }) => (
    <CardActions style={cardActionStyle}>
        {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
        <CreateButton label={null} basePath={basePath} />
        <RefreshButton label={null} />
    </CardActions>
);

const UserFilter = (props) => (
    <Filter label={null} {...props}>
        <TextInput label="Prénom" source="first_name" />
        <TextInput label="Nom" source="last_name" />
        <TextInput label="Courriel" source="email" />
        <TextInput label="Téléphone" source="phone" />
        <BooleanInput label="A souscrit" source="has_subscribed" />
    </Filter>
);

const userRowStyle = (record, index) => ({
    backgroundColor: record.has_subscribed
        ? colors.greenSemiTransparent
        : colors.redSemiTransparent,
});

const UserList = (props) => (
    <List title="Utilisateurs" actions={<UserListActions />} {...props} filters={<UserFilter />}>
        <Datagrid rowStyle={userRowStyle}>
            <TextField source="first_name" label="Prénom" />
            <TextField source="last_name" label="Nom" />
            <TextField source="phone" label="Téléphone" />
            <EmailField source="email" label="Courriel" />
            <EditButton />
        </Datagrid>
    </List>
);

export default UserList;
