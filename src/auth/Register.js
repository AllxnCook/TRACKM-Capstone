import React, { Component } from "react"
import RegistrationManager from "../auth/RegistrationManager"
import { Link } from "react-router-dom";

class Register extends Component {

    // Set initial state
    state = {
        username: "",
        email: "",
        password: "",
        users: [],
        loadingStatus: false
    }

    // Field change for updating state
    handleFieldChange = (evt) => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    }

    // Retrieve users from the database and set state
    compononentDidMount() {

        RegistrationManager.getAll().then(parsedUsers => {

            this.setState({ users: parsedUsers })
        })
    }

    // Create New User

    createUser = event => {

        event.preventDefault();

        if (this.state.username === " " || this.state.email === " " || this.state.password === " ") {
            window.alert("Please enter a unique name and e-mail address");
        } else {
            this.setState({ loadingStatus: true });
            const user = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,

            };

            // Posts New User - Returns to Home
            RegistrationManager.post(user).then(() =>
                this.props.history.push("/")
            );
        }
    }

    // Input Fields for creating a new user

    render() {
        return (
            <form>
                <fieldset>
                    <div className="formgrid">
                        <label htmlFor="inputUserName">User Name</label>
                        <input onChange={this.handleFieldChange} type="username"
                            id="username"
                            placeholder="User Name"
                            required="" autoFocus="" />

                        <label htmlFor="inputUserName">E-mail Address</label>
                        <input onChange={this.handleFieldChange} type="email"
                            id="email"
                            placeholder="E-mail Address"
                            required="" autoFocus="" />

                        <label htmlFor="inputPassword">Password</label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />

                    </div>

                    {/* // Create User / Submit Button */}

                    <div>

                        <Link to={`/home`}>

                            <button

                                type="submit"
                                disabled={this.state.loadingStatus}
                                onClick={this.createUser}

                            >Submit

                    </button>

                        </Link>

                    </div>

                </fieldset>
            </form>
        )
    }

}

export default Register