import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';
import LabelIcon from '@material-ui/icons/Label';
import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
} from 'react-admin';
import { withRouter } from 'react-router-dom';

import UserIcon from "@material-ui/icons/Group";
import InstrumentIcon from "@material-ui/icons/MusicNote";
import StationIcon from "@material-ui/icons/Place";
import StoreIcon from "@material-ui/icons/Store";
import LoanIcon from "@material-ui/icons/CompareArrows";
import MapIcon from "@material-ui/icons/Place";

const items = [
    { name: 'users', icon: <UserIcon /> },
    { name: 'instruments', icon: <InstrumentIcon /> },
    { name: 'loans', icon: <LoanIcon /> },
    { name: 'stations', icon: <StationIcon /> },
    { name: 'stores', icon: <StoreIcon /> },
    { name: 'map', icon: <MapIcon /> },
];

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
};

const Menu = ({ onMenuClick, translate, logout }) => (
    <div style={styles.main}>
        <DashboardMenuItem onClick={onMenuClick} />
        {items.map(item => (
            <MenuItemLink
                key={item.name}
                to={`/${item.name}`}
                primaryText={translate(`resources.${item.name}.name`, {
                    smart_count: 2,
                })}
                leftIcon={item.icon}
                onClick={onMenuClick}
            />
        ))}
        {/* <MenuItemLink
            to="/configuration"
            primaryText={translate('pos.configuration')}
            leftIcon={<SettingsIcon />}
            onClick={onMenuClick}
        /> */}
        <Responsive xsmall={logout} medium={null} />
    </div>
);

const enhance = compose(
    withRouter,
    connect(
        state => ({
            theme: state.theme,
            locale: state.i18n.locale,
        }),
        {}
    ),
    translate
);

export default enhance(Menu);
