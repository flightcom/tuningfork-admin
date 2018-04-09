// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { StationMap } from "./components/Station/map";

function Routes() {
    return (
        <Switch>
            <Route
                path="/stations/map"
                component={StationMap}
                exact
            />
        </Switch>
    );
}

export default Routes;
