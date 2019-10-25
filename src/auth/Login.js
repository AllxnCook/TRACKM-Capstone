import React, { Component } from 'react'
import LoginManager from './LoginManager'

// component to display login information and validate credentials

class Login extends Component {
    // set state
    state = {
        username: "",
        password: "",
    }

    //  method to handle change of input
    handleFieldChange = (change) => {
        const stateChange = {}
        stateChange[change.target.id] = change.target.value
        this.setState(stateChange)
    }
    // handler for login event
    handleLogin = (event) => {
        event.preventDefault()
        LoginManager.getOneUser(this.state.username)
        .then(users => {
            if (this.state.password === users[0].password){
                localStorage.setItem("userId", users[0].id)
                this.props.history.push("/trips/clockin");
            } else {
                alert("Invalid Password")
            }
        })
    }
    // rendering component for log in field using username and password including validation
    render(){
        return (
            <form onSubmit={this.handleLogin}>
                <fieldset>
                    <h3>Sign In</h3>
                    <div className="login">
                        <label htmlFor="inputUsername">Username</label>
                        <input onChange={this.handleFieldChange} type="username"
                        id="username"
                        placeholder="Username"
                        required=""
                        autoFocus="" />
                        <label htmlFor="inputPassword">Password</label>
                        <input onChange={this.handleFieldChange} type="password"
                        id="password"
                        placeholder="Password"
                        required="" />
                    </div>
                    <button type="submit">Sign In</button>
                </fieldset>
            </form>
        )
    }
}
export default Login;