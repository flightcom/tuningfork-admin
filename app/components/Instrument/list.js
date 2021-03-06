import React from 'react';
import { CardActions } from 'material-ui/Card';
import {
    BooleanField,
    BooleanInput,
    CreateButton,
    Datagrid,
    EditButton,
    Filter,
    List,
    ReferenceInput,
    RefreshButton,
    SelectInput,
    TextField,
} from 'admin-on-rest';

import colors from 'styles/colors';

import {
    colorGreen,
    colorRed,
} from 'styles/common';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const InstrumentListActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter }) => (
    <CardActions style={cardActionStyle}>
        {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
        <CreateButton label={null} basePath={basePath} />
        <RefreshButton label={null} />
    </CardActions>
);

const InstrumentFilter = (props) => (
    <Filter label={null} {...props}>
        <ReferenceInput label="Marque" source="brand.id" reference="brands">
            <SelectInput />
        </ReferenceInput>
        <BooleanInput label="À vérifier" source="to_be_checked" />
    </Filter>
);

const colored = Component => props => props.record[props.source]
    ? <Component {...props} elStyle={colorRed} />
    : <Component {...props} elStyle={colorGreen} />

const ToBeCheckedField = colored(BooleanField);

const instrumentRowStyle = (record, index) => ({
    backgroundColor: record.is_available
        ? colors.greenSemiTransparent
        : colors.redSemiTransparent,
});

const InstrumentList = (props) => (
    <List
        title="Instruments"
        actions={<InstrumentListActions />}
        filters={<InstrumentFilter />}
        {...props}
    >
        <Datagrid rowStyle={instrumentRowStyle}>
            <TextField source="model" label="Modèle" />
            <TextField source="brand.name" label="Marque" />
            <ToBeCheckedField source="to_be_checked" label="À Vérfier" />
            <EditButton label={null} />
        </Datagrid>
    </List>
);

export default InstrumentList;
