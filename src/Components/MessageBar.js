import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {showMessage, hideMessage} from "../Actions";

class MessageBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeoutId: -1
        }
    }

    clickHandle = e => {
        e.preventDefault()
        this.props.hideMessage()
    }

    componentDidUpdate(prevProps) {
        if(this.props.msgObj.message !== prevProps.msgObj.message) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
            const timeoutId = setTimeout(() => {
                this.props.hideMessage()
            }, 10000)

            this.setState({timeoutId})
        }
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeoutId)
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
