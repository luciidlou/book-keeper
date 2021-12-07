import Settings from "./Settings"

const BooksRepositiory = {
    async getAll() {
        return fetch(`${Settings.remoteURL}/books`)
            .then(res => res.json())
    },
    async add(newBook) {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        }
        return fetch(`${Settings.remoteURL}/books`, fetchOptions)
            .then(res => res.json())
    }
}
export default BooksRepositiory