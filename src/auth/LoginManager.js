// declaring variable to simplify calling the api
const remoteURL = "http://localhost:1414";

// method to retrieve usernames from the database for login

export default {
    // pulling one user from the database
    getOneUser(username){
        return fetch (`${remoteURL}/users?username=${username}`)
        .then(result => result.json())
    }
}