import Settings from "./Settings"

const ShelvesRepository = {
    async getAll() {
        const res = await fetch(`${Settings.remoteURL}/shelves`)
            return await res.json()
    }

}
export default ShelvesRepository