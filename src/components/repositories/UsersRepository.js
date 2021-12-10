import Settings from "./Settings"

/* 
We can use the async keyword before a function name to wrap the return value of this function in a Promise. We can 
use the await keyword (in an async function) to wait for a promise to be resolved or rejected before continuing code execution in this block. 
*/

const UsersRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/users?_embed=userBooks`)
        return await res.json()
    }
}
export default UsersRepository