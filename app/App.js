// in src/App.js
import React from "react";
import { Route } from 'react-router-dom'
import { Admin, Resource, resolveBrowserLocale } from "react-admin";

import dataProvider from './dataProvider';

import UserIcon from "@material-ui/icons/Group";
import InstrumentIcon from "@material-ui/icons/MusicNote";
import StationIcon from "@material-ui/icons/Place";
import StoreIcon from "@material-ui/icons/Store";
import LoanIcon from "@material-ui/icons/CompareArrows";

import Dashboard from "./Dashboard";
import authProvider from "./authProvider";

// Layout
import Layout from 'layouts/v2';
// import myTheme from "./themes/blue";

// Menu
import Menu from './Menu';

// Components
// User
import UserList from "./components/User/list";
import UserEdit from "./components/User/edit";
import UserCreate from "./components/User/create";
import UserDelete from "./components/User/delete";
// Instrument
import InstrumentList from "./components/Instrument/list";
import InstrumentCreate from "./components/Instrument/create";
import InstrumentEdit from "./components/Instrument/edit";
// Loan
import LoanList from "./components/Loan/list";
import LoanCreate from "./components/Loan/create";
// import LoanEdit from "./components/Loan/edit";
// import LoanDelete from "./components/Loan/delete";
// Station
import StationList from "./components/Station/list";
import StationCreate from "./components/Station/create";
import StationEdit from "./components/Station/edit";
import StationDelete from "./components/Station/delete";
// Store
import StoreList from "./components/Store/list";
import StoreCreate from "./components/Store/create";
import StoreEdit from "./components/Store/edit";
import StoreDelete from "./components/Store/delete";
// Map
import MapList from "./components/Map/list";
// Brand
import BrandCreate from "./components/Brand/create"
// Subscription
import SubscriptionCreate from "./components/Subscription/create";

// Sagas
import subscribeSaga from './sagas/subscribe';
import unsubscribeSaga from './sagas/unsubscribe';

// Routes
import customRoutes from './routes';

// Translations
import englishMessages from './i18n/en';
import frenchMessages from './i18n/fr';

const messages = {
    fr: frenchMessages,
    en: englishMessages,
};

const i18nProvider = locale => {
    console.log('locale', locale);
    return messages[locale];
}

const App = () => (
    <Admin
        title="tuningfork"
        authProvider={authProvider}
        dashboard={Dashboard}
        dataProvider={dataProvider}
        appLayout={Layout}
        menu={Menu}
        customSagas={[ subscribeSaga, unsubscribeSaga ]}
        locale={resolveBrowserLocale()}
        i18nProvider={i18nProvider}
    >
        <Resource
            name="users"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
            remove={UserDelete}
        />
        <Resource
            name="instruments"
            icon={InstrumentIcon}
            list={InstrumentList}
            edit={InstrumentEdit}
            create={InstrumentCreate}
            // remove={InstrumentDelete}
        />
        <Resource
            options={{ label: 'Prêts' }}
            name="loans"
            icon={LoanIcon}
            list={LoanList}
            create={LoanCreate}
            // edit={LoanEdit}
            // remove={LoanDelete}
        />
        <Resource
            name="stations"
            icon={StationIcon}
            list={StationList}
            edit={StationEdit}
            create={StationCreate}
            remove={StationDelete}
        />
        <Resource
            name="stores"
            icon={StoreIcon}
            list={StoreList}
            edit={StoreEdit}
            create={StoreCreate}
            remove={StoreDelete}
        />

        <Resource name="brands" create={BrandCreate} />
        <Resource name="categories" />
        <Resource name="subcategories" />
        <Resource name="roles" />
        <Resource name="map" list={MapList} />
    </Admin>
);

export default App;
