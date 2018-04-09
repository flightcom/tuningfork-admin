// @flow

import styled from 'styled-components';
import colors from './colors';

export const colorGreen = {
    color: colors.green,
};

export const colorRed = {
    color: colors.red,
};

export const AppWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    min-height: 100%;
`;

export const Container = styled.div`
    color: ${colors.gray10};
    background-color: ${colors.gray90};
    min-height: 100vh;
    padding-top: 100px;
    position: relative;
`;

export const Content = styled.div`
    padding: 50px 35px;
    h1:first-child {
        margin-top: 0;
    }
`;

export const Clearfix = styled.div`
    clear: both;
`;

export const Center = styled.div`
    text-align: center;
`;
