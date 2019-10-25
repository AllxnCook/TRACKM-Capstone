import React, { Component } from 'react'
import NavBar from './navbar/NavBar'
import ApplicationViews from './ApplicationViews'
import './Trackm.css'

// component which runs the routing points of the application

class Trackm extends Component {
    render() {
        return (
            <>
            <NavBar />
            <ApplicationViews />
            </>
        )
    }
}

export default Trackm