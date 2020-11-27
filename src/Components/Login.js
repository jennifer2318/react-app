import React, {Component} from 'react';
import Input from "./Input";
import {connect} from 'react-redux';
import {userLogin} from './../Actions';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: {value: '', valid: false},
            password: {value: '', valid: false},
        }
    }

    changeHandle = obj => {
        this.setState(
            {
                [obj.name]: {value: obj.value, valid: obj.valid}
            }
        )
    }

    submitHandle = e  => {
        e.preventDefault()
        const canSubmit = this.state.username.valid && this.state.password.valid;

        if (canSubmit) {
            this.props.userLogin({
                username: this.state.username.value,
                password: this.state.password.value,
            })
        }
    }

    render() {
        return (
            <div className='container login-page'>
                <form onSubmit={this.submitHandle}>
                    <h1>Авторизация</h1>
                    <Input onChange={this.changeHandle} placeholder='Ваш логин' name='username'/>
                    <Input onChange={this.changeHandle} placeholder='Ваш пароль' name='password'/>
                    <input type='submit'/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.login.token
})

const mapDispatchToProps = dispatch => ({
    userLogin: userInfo => dispatch(userLogin(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);