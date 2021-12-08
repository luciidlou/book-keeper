import Settings from "./Settings"

const UsersRepository = {
    async get(id) {
        const res = await fetch(`${Settings.remoteURL}/users/${id}`)
        return await res.json()
    }
}
export default UsersRepository