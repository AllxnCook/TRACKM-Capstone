import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ClockInManager from './ClockInManager';
import moment from 'moment'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'


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
            // <Card className="clock-in-card" bg="dark" text="white" style={{ width: '18rem' }}>
            //     <Card.Body>
            //         <Dropdown>
            //             <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            //                 Bus Number
            //         </Dropdown.Toggle>
            //             <Dropdown.Menu
            //                 className="form-control"
            //                 id="busId"
            //                 value={this.state.busId}
            //                 onChange={this.handleFieldChange}
            //             ><Dropdown.Item>
            //                     {this.state.buses.map(bus => (
            //                         <option
            //                             key={bus.id.busNumber}
            //                             value={bus.id}
            //                         >
            //                             {bus.busNumber}
            //                         </option>
            //                     ))}
            //                 </Dropdown.Item>
            //             </Dropdown.Menu>
            //         </Dropdown>
            //         <Form>
            //             <Form.Check
            //                 label={`Pre-Trip Inspection`}
            //                 onChange={this.handleFieldChange}
            //             />
            //         </Form>
            //         <Form.Group controlId="exampleForm.ControlTextarea1">
            //             <Form.Label>Notes:</Form.Label>
            //             <Form.Control onChange={this.handleFieldChange} as="textarea" rows="3" />
            //         </Form.Group>
            //         <Card.Link onClick={this.newClockInCard} href="">{`Clock In`}</Card.Link>
            //     </Card.Body>
            // </Card>
            <div className="card">
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

                    <button onClick={this.newClockInCard}>Clock In</button>
                </div>

            </div>
        )

    }
}
export default withRouter(ClockInCard);

