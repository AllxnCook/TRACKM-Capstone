import React, { Component } from 'react'
import TimeCard from './TimeCard'
import TimeCardManager from './TimeCardManager'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import './TimeCard.css'


class TimeCardList extends Component {
    // state
    state = {
        id: 1,
        fullCard: []
    };
    // method for deleting a single trip from the trip list
    deleteCard = id => {
        TimeCardManager.delete(id).then(() => {
            TimeCardManager.getAll().then(parsedCards => {
                this.setState({
                    id: 1,
                    fullCard: parsedCards
                })
            })
        })
    };
    // method for getting all of the information from database then setting it in state
    componentDidMount() {
        TimeCardManager.getAll()
            .then((fullCard) => {
                this.setState({
                    id: 1,
                    fullCard: fullCard
                })
            })
    }
    //method for handling logout functionality
    handleLogout() {
        window.localStorage.clear()
    }
    //render method to print time cards to DOM
    render() {
        return (
            <>
                <section className="section-content">
                    <Button type="button"
                        className="new-card-btn"
                        variant="secondary"
                        onClick={() => { this.props.history.push("/trips/clockin") }}>
                        New Trip
                </Button><Link to={'/'}>
                <Button type="button"
                className="logout-btn"
                variant="secondary"
                onClick={this.handleLogout}>Logout</Button></Link>
                </section>
                <div className="container-cards">
                    {this.state.fullCard.map(singleCard =>
                        <TimeCard key={singleCard.id} timecardProp={singleCard} deleteCard={this.deleteCard} {...this.props} />)}
                </div>
            </>
        )
    }
}

export default TimeCardList;
