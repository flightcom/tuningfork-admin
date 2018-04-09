import React from 'react';
import { CardActions } from 'material-ui/Card';
import {
    CreateButton,
    Datagrid,
    EditButton,
    EmailField,
    Filter,
    List,
    RefreshButton,
    TextField,
    TextInput,
} from 'admin-on-rest';

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
            <TextField source="first_name" label="Prénom" />
            <EditButton />
        </Datagrid>
    </List>
);

export default LoanList;
