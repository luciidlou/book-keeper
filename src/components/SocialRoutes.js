import { Route } from "react-router-dom"
import FollowersList from "./social/FollowersList"

// This function is responsible for rendering the SocialRoutes component. This is the parent component of all the components in the social directory
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