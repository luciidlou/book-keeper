import Settings from "./Settings"

const LikesRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/likes?_expand=user&_expand=post`)
        return await res.json()
    },
    async getLikeByUserAndPost(userId, postId) {
        const res = await fetch(`${Settings.remoteURL}/likes/?userId=${userId}&postId=${postId}&_expand=user&_expand=post`)
        return await res.json()
    },
    async add(newLikeObj) {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLikeObj)
        }
        const res = await fetch(`${Settings.remoteURL}/likes?_expand=user&_expand=post`, fetchOptions)
        return await res.json()
    },
    async delete(id) {
        const res = await fetch(`${Settings.remoteURL}/likes/${id}`, {method: "DELETE"})
        return await res.json()
    }
}
export default LikesRepository