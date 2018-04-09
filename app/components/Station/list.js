import React from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import StationsMapIcon from 'material-ui/svg-icons/maps/place';

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

import {
    colorGreen,
    colorRed,
} from '../../styles/common';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const StationListActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter }) => (
    <CardActions style={cardActionStyle}>
        {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
        <CreateButton label={null} basePath={basePath} />
        <RefreshButton label={null} />
    </CardActions>
);

const colored = Component => props => props.record[props.source]
    ? <Component {...props} elStyle={colorRed} />
    : <Component {...props} elStyle={colorGreen} />

const ToBeCheckedField = colored(BooleanField);


const StationList = (props) => (
    <List
        title="Stations"
        actions={<StationListActions />}
        {...props}
    >
        <Datagrid>
            <TextField source="name" label="Nom" />
            <TextField source="location.full_address" label="Adresse" />
            <EditButton label={null} />
        </Datagrid>
    </List>
);

export default StationList;
