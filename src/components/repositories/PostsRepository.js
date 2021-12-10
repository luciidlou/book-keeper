import Settings from "./Settings"

/* 
We can use the async keyword before a function name to wrap the return value of this function in a Promise. We can 
use the await keyword (in an async function) to wait for a promise to be resolved or rejected before continuing code execution in this block. 
*/

const PostsRepository = {
    async add(post) {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        }
        const res = await fetch(`${Settings.remoteURL}/posts`, fetchOptions)
        return await res.json()
    },
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/posts?_expand=user&_expand=shelf&_sort=dateCreated&_order=desc`)
        return await res.json()
    },
    async delete(id) {
        const res = await fetch(`${Settings.remoteURL}/posts/${id}`, {method: "DELETE"})
        return await res.json()
    }
}
export default PostsRepository