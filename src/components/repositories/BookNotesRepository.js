import Settings from "./Settings"

const BookNotesRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/bookNotes`)
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
    }
}
export default BookNotesRepository