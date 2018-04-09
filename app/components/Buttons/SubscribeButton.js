import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import FlatButton from 'material-ui/FlatButton';
import { subscribe as subscribeAction } from '../../actions/User/subscribe';

class SubscribeButton extends React.Component {
    handleClick = () => {
        const { push, record, showNotification, subscribe } = this.props;
        const data = {
            starts_at: moment().utc().format(),
        };
        subscribe(record.id, data);
    }

    render() {
        return <FlatButton label="Souscrire" onClick={this.handleClick} />;
    }
}

SubscribeButton.propTypes = {
    subscribe: PropTypes.func,
    record: PropTypes.object,
};

const mapDispatchToProps = (dispatch: ReduxDispatch) =>
    bindActionCreators(
        {
            subscribe: subscribeAction,
        },
        dispatch
    );

export default connect(null, mapDispatchToProps)(SubscribeButton);
