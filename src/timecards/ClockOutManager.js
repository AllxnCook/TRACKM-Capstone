const remoteURL = "http://localhost:1414"

export default{
    get(id) {
        return fetch(`${remoteURL}/trips/${id}`)
        .then(result => result.json())
    },
    update(clockOut) {
        return fetch(`${remoteURL}/trips/${clockOut.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clockOut)
        }).then(result => result.json())
    }
}