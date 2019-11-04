import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ClockInManager from './ClockInManager';
import moment from 'moment'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './TimeCard.css'


class ClockInCard extends Component {
    // creating state to send to the database

    state = {
        busId: 1,
        preTrip: "",
        notes: "",
        startTime: "",
        buses: []
    };
    //method for handling passing through buses
    componentDidMount() {
        ClockInManager.getAllBuses()
            .then(parsedBuses => {
                this.setState({
                    buses: parsedBuses
                })
            })
    };
    // method for handling all field changes and updating state

    handleFieldChange = event => {
        let stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    };
    handleCheckboxChange = event => {
        let stateToChange = {};
        stateToChange[event.target.id] = event.target.checked;
        this.setState(stateToChange)
    }
    // method for posting a new clock-in card and send it to /trips on the app
    newClockInCard = click => {
        click.preventDefault();
        if (this.state.preTrip === false) {
            alert("Please fill out your pre-trip sheet!");
        } else {
            this.setState();
            const clockIn = {
                busId: this.state.busId,
                preTrip: this.state.preTrip,
                notes: this.state.notes,
                startTime: moment().format('llll')
            };
            //setting state then pushing to /trips and put time in state
            ClockInManager.post(clockIn)
                .then((object) => this.props.history.push(`/trips/clockout/${object.id}`))
        }
    };

    render() {
        return (

            <div className="card" id="clockin-card">
                <div className="card-content">
                    <select
                        className="form-control"
                        id="busId"
                        value={this.state.busId}
                        onChange={this.handleFieldChange}
                    >
                        {this.state.buses.map(bus => (
                            <option
                                key={bus.id.busNumber}
                                value={bus.id}
                            >
                                {bus.busNumber}
                            </option>
                        ))}
                    </select>
                    <input type="checkbox"
                    id="preTrip"
                        key={this.state.preTrip}
                        onChange={this.handleCheckboxChange}
                    ></input><label>Pre-Trip Inspection</label><br />
                    <label>Notes</label><input
                    id="notes"
                        type="text"
                        placeholder="Notes"

                        onChange={this.handleFieldChange}></input><br />

                    <Button variant="secondary"onClick={this.newClockInCard}>Clock In</Button>
                </div>

            </div>
        )

    }
}
export default withRouter(ClockInCard);

