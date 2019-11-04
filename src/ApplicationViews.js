import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import TimeCardList from './timecards/TimeCardList'
import Login from "./auth/Login"
import Register from './auth/Register'
import ClockInCard from './timecards/ClockInCard'
import ClockOutCard from './timecards/ClockOutCard'
import Home from './home/Home'
// component for controlling login behavior and redirecting incase of invald information

class ApplicationViews extends Component {
    // check to see if credentials are in local storage
    isAuthenticated = () => localStorage.getItem("userId") !== null;
    // render the page routes if authenticated by login information
    // "/" is landing page
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props => { return <Home {...props} />}} />
                <Route exact path="/signin" render={props => { return<Login {...props} /> }} />
                <Route exact path="/register" render={props => { return <Register {...props} /> }} />
                <Route exact path="/trips/clockin" render={props => { return this.isAuthenticated() ? (<ClockInCard {...props} />) : (<Redirect to="/"/>) }} />
                <Route exact path="/trips/clockout" render={props => { return this.isAuthenticated() ? (<ClockOutCard {...props} />) : (<Redirect to="/"/>) }} />
                <Route path="/trips/clockout/:tripId(\d+)" render={props => { return this.isAuthenticated() ? (<ClockOutCard {...props} />) : (<Redirect to="/"/>) }} />
                <Route exact path="/trips" render={props => { return this.isAuthenticated()?(<TimeCardList {...props} />) : (<Redirect to="/"/>) }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews;