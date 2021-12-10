import Settings from "./Settings"

const FollowsRepository = {
    async add(follow) {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follow)
        }
        const res = await fetch(`${Settings.remoteURL}/follows?_expand=user&_expand=follow`, fetchOptions)
        return await res.json()
    },
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/follows?_expand=user&_expand=follow`)
        return await res.json()
    },
    async delete(id) {
        return await fetch(`${Settings.remoteURL}/follows/${id}`, { method: "DELETE" })
    }
}
export default FollowsRepository