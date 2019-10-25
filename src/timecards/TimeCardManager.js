const remoteURL = "http://localhost:1414"
export default {
    getAll() {
        return fetch(`${remoteURL}/trips?_expand=bus`)
        .then(result => result.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/trips/${id}`, {
            method: "DELETE"
        })
        .then(result => result.json())
    }
}