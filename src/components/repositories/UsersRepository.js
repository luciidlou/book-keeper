import Settings from "./Settings"

const UsersRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/users?_embed=userBooks`)
        return await res.json()
    }
}
export default UsersRepository