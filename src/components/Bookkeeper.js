import { Redirect, Route } from "react-router-dom"
import ApplicationViews from "./ApplicationViews"
import Login from "./auth/Login"
import { Register } from "./auth/Register"
import useSimpleAuth from "../hooks/useSimpleAuth"
import { NavBar } from "./nav/NavBar"
import "./Bookkeeper.css"

// This function is responsible for rendering the Bookkeeper component. This is the parent component of all the other exisiting components in the components directory.
export const Bookkeeper = () => {
    const { isAuthenticated } = useSimpleAuth()
    return <>
        <Route render={() => {
            if (isAuthenticated()) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
}