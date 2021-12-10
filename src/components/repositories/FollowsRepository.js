import Settings from "./Settings"

/* 
We can use the async keyword before a function name to wrap the return value of this function in a Promise. We can 
use the await keyword (in an async function) to wait for a promise to be resolved or rejected before continuing code execution in this block. 
*/

const FollowsRepository = {
    async add(follow) {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follow)
        }
        const res = await fetch(`${Settings.remoteURL}/follows?_expand=user`, fetchOptions)
        return await res.json()
    },
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/follows?_expand=user`)
        return await res.json()
    },
    async delete(id) {
        return await fetch(`${Settings.remoteURL}/follows/${id}`, { method: "DELETE" })
    }
}
export default FollowsRepository