const remoteURL = "http://localhost:1414";

export default {
    post(startNewCard) {
        return fetch(`${remoteURL}/trips`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(startNewCard)
        }).then(response => response.json())
    },
    getAllBuses() {
        return fetch(`${remoteURL}/buses`)
        .then(response => response.json())
    },
    
}