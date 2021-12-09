import { Route } from "react-router-dom"
import BookRoutes from "./BookRoutes"
import SocialRoutes from "./FriendRoutes"
import Home from "./home/Home"

const ApplicationViews = () => {
    return (
        <>
            <Route exact path={["/", "/home"]}>
                <Home />
            </Route>
            <BookRoutes />
            <SocialRoutes />
        </>
    )
}
export default ApplicationViews