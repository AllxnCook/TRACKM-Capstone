import React, { Component } from 'react'
import ClockOutManager from './ClockOutManager'
import moment from 'moment'


class ClockOutCard extends Component {
    // state for final card getting posted to /trips
    state = {
        id: 1,
        busId: 1,
        preTrip: "",
        postTrip: "",
        notes: "",
        startTime: "",
        endTime: "",
        buses: []
    };

    // method for handling checkbox change
    handleCheckboxChange = event => {
        let stateToChange = {};
        stateToChange[event.target.id] = event.target.checked;
        this.setState(stateToChange)
    };
    // method for updating trip card on clockout
    clockOutUpdate = click => {
        click.preventDefault()
        if(this.state.postTrip === false){
            alert("Please fill out your post-trip inspection!")
        } else{
        this.setState();
        const clockOutPush = {
            id: this.state.id,
            busId: this.state.busId,
            preTrip: this.state.preTrip,
            postTrip: this.state.postTrip,
            notes: this.state.notes,
            startTime: this.state.startTime,
            endTime: moment().format('llll')
        }
        ClockOutManager.update(clockOutPush)
        .then(() => this.props.history.push("/trips"))
     }};
    // method for getting final information to post the full trip card to list view
    componentDidMount(){
        ClockOutManager.get(this.props.match.params.tripId)
        .then(tripCard => {
            this.setState({
                id: tripCard.id,
                busId: tripCard.busId,
                preTrip: tripCard.preTrip,
                postTrip: tripCard.postTrip,
                notes: tripCard.notes,
                startTime: tripCard.startTime,
                endTime: tripCard.endTime
            })
        })
    };

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <input type="checkbox"
                    id="postTrip"
                        key={this.state.postTrip}
                        onChange={this.handleCheckboxChange}
                    ></input><label>Post-Trip Inspection</label><br />

                    <button onClick={this.clockOutUpdate}>Clock Out</button>
                </div>

            </div>
        )
    }
}
export default ClockOutCard;