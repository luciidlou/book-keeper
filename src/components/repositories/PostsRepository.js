import Settings from "./Settings"

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
        const res = await fetch(`${Settings.remoteURL}/posts?_expand=userBook&_expand=shelf&_sort=dateCreated&_order=desc`)
        return await res.json()
    },
    async delete(id) {
        const res = await fetch(`${Settings.remoteURL}/posts/${id}`, {method: "DELETE"})
        return await res.json()
    }
}
export default PostsRepository