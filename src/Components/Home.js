import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getUsersFetch} from "../Actions";
import {connect} from "react-redux";
import DataTable from "./DataTable";

class Home extends Component {
    componentDidMount() {
        this.props.getUsersFetch()
    }

    render() {
        return (
            <DataTable data={this.props.users}/>
        );
    }
}

Home.propTypes = {};

const mapStateToProps = state => ({
    users: state.usersList.users
})

const mapDispatchToProps = dispatch => ({
    getUsersFetch: () => dispatch(getUsersFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
