import Settings from "./Settings"

const UserBooksRepository = {
    async getAll() {
        return fetch(`${Settings.remoteURL}/userBooks?_expand=book`)
            .then(res => res.json())
    },
    async add(newUserBook) {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserBook)
        }
        return fetch(`${Settings.remoteURL}/userBooks`, fetchOptions)
            .then(res => res.json())
    }
}
export default UserBooksRepository