import Settings from "./Settings"

/* 
We can use the async keyword before a function name to wrap the return value of this function in a Promise. We can 
use the await keyword (in an async function) to wait for a promise to be resolved or rejected before continuing code execution in this block. 
*/

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