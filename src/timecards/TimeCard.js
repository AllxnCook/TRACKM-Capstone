import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import './TimeCard.css'



class TimeCard extends Component {

    // rendering the parsed completion of a full time card
    render() {
        return (

            <div className="card">
                <div className="card-content">
                    <p>Bus Number: {this.props.timecardProp.bus.busNumber}</p>
                    <p>Pre-Trip: {this.props.timecardProp.preTrip = (true)?(`Completed`):('')}</p>
                    <p>Post-Trip: {this.props.timecardProp.postTrip = (true)?(`Completed`):('')}</p>
                    <p>Notes: {this.props.timecardProp.notes}</p>
                    <p>Start: {this.props.timecardProp.startTime}</p>
                    <p>End: {this.props.timecardProp.endTime}</p>
                    <button type="button" id="delete-trip-btn" onClick={() => this.props.deleteCard(this.props.timecardProp.id)}>Delete</button>
                </div>
            </div>
        )
    }
}
export default TimeCard;