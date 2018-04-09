// @flow

/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { changeLocale } from 'services/Language/actions';
import { selectLocale } from 'services/Language/selectors';

import type { ReduxDispatch, InputEvent, ReactNode } from 'types';

type Props = {
    locale: string,
    messages: { [string]: Object },
    children: ReactNode,
};

class LanguageProvider extends React.PureComponent<Props> {
    render() {
        return (
            <IntlProvider
                key={this.props.locale}
                locale={this.props.locale}
                messages={this.props.messages[this.props.locale]}
            >
                {React.Children.only(this.props.children)}
            </IntlProvider>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    locale: selectLocale(),
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => ({
    toggleLocale: (evt: InputEvent) => dispatch(changeLocale(evt.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
