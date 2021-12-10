import Settings from "./Settings"

const UserBooksRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/userBooks?_expand=book&_expand=shelf`)
        return await res.json()
    },
    async get(id) {
        const res = await fetch(`${Settings.remoteURL}/userBooks/${id}?_expand=book&_expand=shelf`)
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
        const res = await fetch(`${Settings.remoteURL}/userBooks?_expand=book&_expand=shelf`, fetchOptions)
        return await res.json()
    },
    async delete(id) {
        return await fetch(`${Settings.remoteURL}/userBooks/${id}`, { method: "DELETE" })
    },
    async updateShelf(editedUserBook) {
        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedUserBook)
        }
        const res = await fetch(`${Settings.remoteURL}/userBooks/${editedUserBook.id}`, fetchOptions)
        return await res.json()
    },
    async updateDateRead(editedUserBook) {
        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedUserBook)
        }
        const res = await fetch(`${Settings.remoteURL}/userBooks/${editedUserBook.id}`, fetchOptions)
        return await res.json()
    }
}
export default UserBooksRepository