import Settings from "./Settings"

const UserBooksRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/userBooks?_expand=book&_expand=shelf`)
            return await res.json()
    },
    async add(newUserBook) {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserBook)
        }
        const res = await fetch(`${Settings.remoteURL}/userBooks`, fetchOptions)
            return await res.json()
    },
    async delete(id) {
        return await fetch(`${Settings.remoteURL}/userBooks/${id}`, { method: "DELETE" })
    }
}
export default UserBooksRepository