import { Nav, NavItem, NavLink } from "reactstrap"
import useSimpleAuth from "../hooks/useSimpleAuth"
import "./NavBar.css"
import worldBook from "../../images/world-book.png"

export const NavBar = () => {
    const { isAuthenticated, logout, getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    return (
        <>
            <div className="header">
                <h1 className="header__title">Bookkeeper <img src={worldBook} alt="a stack of books" /> </h1>
                <h3 className="header__welcome">Welcome, {currentUser.firstName}</h3>
            </div>
            <Nav className="navbar">
                <NavItem active className="navbar__item">
                    <NavLink className="navbar__link" href="/home">Home</NavLink>
                </NavItem>
                <NavItem active className="navbar__item">
                    <NavLink className="navbar__link" href="/mybooks">My Books</NavLink>
                </NavItem>
                <NavItem active className="navbar__item">
                    <NavLink className="navbar__link" href="/social">Social</NavLink>
                </NavItem>
                <NavItem active className="navbar__logout">
                    {
                        isAuthenticated()
                            ? <NavLink onClick={() => {
                                logout()
                            }} className="nav-link" href="/login">Logout</NavLink>
                            : <NavLink className="navbar-link" href="/login">Login</NavLink>
                    }
                </NavItem>
                <NavItem active className="navbar__item">
                    {
                        !isAuthenticated()
                            ? <NavLink className="navbar-link" href="/register">Register</NavLink>
                            : ""
                    }
                </NavItem>
            </Nav>
        </>
    )
}