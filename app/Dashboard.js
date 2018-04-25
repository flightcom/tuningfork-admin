// in src/Dashboard.js
import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import { ViewTitle } from 'react-admin';

export default () => (
    <Card>
        <ViewTitle title="Welcome to the administration" />
        <CardContent>Lorem ipsum sic dolor amet...</CardContent>
    </Card>
);
