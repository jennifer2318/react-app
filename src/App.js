import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Login from "./Components/Login";
import {getToken, logout} from "./Actions";
import MessageBar from "./Components/MessageBar";

import './App.sass'

class App extends Component {
  componentDidMount = () => {
    this.props.getToken()
  }

    clickHandle = e => {
        e.preventDefault()
        localStorage.removeItem("token")
        this.props.logout()
    }

  render() {
      const {token} = this.props;

      return (
        <BrowserRouter>
            <div className='container-fluid header'>
                <div className='container'>
                    <div className='header-container'>
                        <ul>
                            <li>
                                <Link className='button' to="/">Главная</Link>
                            </li>
                            {
                                !token ? <li><Link className='button' to="/login">Войти</Link></li> : null
                            }
                        </ul>
                        {
                            token
                                ? <button onClick={this.clickHandle}>Выход</button>
                                : null
                        }
                    </div>
                </div>
            </div>
                <Switch>
                    <Route exact path="/">
                        {!token ? <Redirect to="/login" /> : ''}
                    </Route>
                   <Route path="/login" component={Login} />
                </Switch>
            <MessageBar/>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
    token: state.login.token
})

const mapDispatchToProps = dispatch => ({
    getToken: () => dispatch(getToken()),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);