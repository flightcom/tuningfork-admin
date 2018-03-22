// in src/App.js
import React from "react";
import { Admin, Resource, Delete } from "admin-on-rest";
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import myApiRestClient from './restClient';

import UserIcon from "material-ui/svg-icons/social/group";

import Dashboard from "./Dashboard";
import authClient from "./authClient";

import myTheme from "./themes/blue";

import { UserList } from "./components/User/list";
import { UserEdit } from "./components/User/edit";
import { UserCreate } from "./components/User/create";
import { UserDelete } from "./components/User/delete";

const App = () => (
    <Admin
        theme={getMuiTheme(myTheme)}
        title="tuningfork"
        authClient={authClient}
        dashboard={Dashboard}
        restClient={myApiRestClient}
    >
        <Resource
            name="users"
            icon={UserIcon}
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
            remove={UserDelete}
        />
        <Resource name="roles" />
    </Admin>
);

export default App;
