import Settings from "./Settings"

const ShelvesRepository = {
    async getAll() {
        return fetch(`${Settings.remoteURL}/shelves`)
            .then(res => res.json())
    }

}
export default ShelvesRepository