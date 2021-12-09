import { Route } from "react-router-dom"
import FollowersList from "./social/FollowersList"

const SocialRoutes = () => {
    return (
        <>
            <Route exact path="/social">
                <FollowersList />
            </Route>
        </>
    )
}
export default SocialRoutes