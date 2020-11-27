import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {showMessage, hideMessage} from "../Actions";

class MessageBar extends Component {
    constructor(props) {
        super(props);
    }

    clickHandle = e => {
        e.preventDefault()
        this.props.hideMessage()
    }

    render() {
        const {message, type} = this.props.msgObj;

        if (message) {
            return (
                <div className={classNames('message-bar', type)}>
                    <span>{message}</span>
                    <button className='close' onClick={this.clickHandle}></button>
                </div>
            );
        }else {
            return null
        }
    }
}

MessageBar.propTypes = {};

const mapStateToProps = state => ({
    msgObj: state.messageBar.message,
})

const mapDispatchToProps = dispatch => ({
    hideMessage: () => dispatch(hideMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);
