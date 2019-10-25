import React, { Component } from 'react'
import TimeCard from './TimeCard'
import TimeCardManager from './TimeCardManager'


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
    //render method to print time cards to DOM
    render() {
        return (
            <>
                <section className="section-content">
                    <button type="button"
                        className="new-card-btn"
                        onClick={() => { this.props.history.push("/trips/clockin") }}>
                        New Trip
                </button>
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
