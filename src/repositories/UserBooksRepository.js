import Settings from "./Settings"

/* 
We can use the async keyword before a function name to wrap the return value of this function in a Promise. We can 
use the await keyword (in an async function) to wait for a promise to be resolved or rejected before continuing code execution in this block. 
*/

const UserBooksRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/userBooks?_expand=book&_expand=shelf&_embed=bookNotes&_sort=id&_order=desc`)
        return await res.json()
    },
    async get(id) {
        const res = await fetch(`${Settings.remoteURL}/userBooks/${id}?_expand=book&_expand=shelf&_embed=bookNotes`)
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
        const res = await fetch(`${Settings.remoteURL}/userBooks?_expand=book&_expand=shelf&_embed=bookNotes`, fetchOptions)
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