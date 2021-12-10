import Settings from "./Settings"
import UserBooksRepository from "./UserBooksRepository"

/* 
We can use the async keyword before a function name to wrap the return value of this function in a Promise. We can 
use the await keyword (in an async function) to wait for a promise to be resolved or rejected before continuing code execution in this block. 
*/

const BookNotesRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/bookNotes?_expand=userBook`)
        return await res.json()
    },
    async add(note) {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        }
        const res = await fetch(`${Settings.remoteURL}/bookNotes`, fetchOptions)
        return await res.json()
    },
    async delete(id) {
        const res = await fetch(`${Settings.remoteURL}/bookNotes/${id}`, { method: "DELETE" })
        return await res.json()
    },
    async deleteNotesForUserBook(userBookId) {
        return UserBooksRepository.get(userBookId)
            .then(userBook => {
                return userBook.bookNotes?.map(
                    note => fetch(`${Settings.remoteURL}/bookNotes/${note.id}`, { method: "DELETE" })
                )
            })

    }
}
export default BookNotesRepository