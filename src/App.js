import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';

class App extends Component {
  componentDidMount = () => {

  }

  render() {
    return (
        <BrowserRouter>
          <Switch>

          </Switch>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App);