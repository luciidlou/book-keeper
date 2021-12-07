import Settings from "./Settings"

const BooksRepositiory = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/books`)
        return await res.json()
    },
    async add(newBook) {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        }
        const res = await fetch(`${Settings.remoteURL}/books`, fetchOptions)
            return await res.json() 
    }
}
export default BooksRepositiory