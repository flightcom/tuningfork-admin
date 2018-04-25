import React from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/Button';
import {
    CreateButton,
    Datagrid,
    DateField,
    EditButton,
    EmailField,
    Filter,
    List,
    ReferenceField,
    RefreshButton,
    TextField,
    TextInput,
} from 'react-admin';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const LoanListActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter }) => (
    <CardActions style={cardActionStyle}>
        {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
        <CreateButton label={null} basePath={basePath} />
        <RefreshButton label={null} />
    </CardActions>
);

const LoanFilter = (props) => (
    <Filter label={null} {...props}>
        <TextInput label="Prénom" source="first_name" />
    </Filter>
);

const LoanList = (props) => (
    <List title="Prêts" actions={<LoanListActions />} {...props} filters={<LoanFilter />}>
        <Datagrid>
            <DateField source="starts_at" label="Début" />
            <DateField source="ends_at" label="Fin" />
            <DateField source="ended_at" label="Fin (réelle)" />
            <ReferenceField label="Utilisateur" source="user.id" reference="users">
                <TextField source="full_name" />
            </ReferenceField>
            <ReferenceField label="Instrument" source="instrument.id" reference="instruments">
                <TextField source="categories[0].name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

export default LoanList;
