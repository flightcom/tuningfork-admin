import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import FlatButton from 'material-ui/Button';
import { unsubscribe as unsubscribeAction } from '../../actions/User/unsubscribe';

class UnsubscribeButton extends React.Component {
    handleClick = () => {
        const { push, record, showNotification, unsubscribe } = this.props;
        unsubscribe(record.id);
    }

    render() {
        return <FlatButton label="Désouscrire" onClick={this.handleClick} />;
    }
}

UnsubscribeButton.propTypes = {
    subscribe: PropTypes.func,
    record: PropTypes.object,
};

const mapDispatchToProps = (dispatch: ReduxDispatch) =>
    bindActionCreators(
        {
            unsubscribe: unsubscribeAction,
        },
        dispatch
    );

export default connect(null, mapDispatchToProps)(UnsubscribeButton);
