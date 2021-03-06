import { Nav, NavItem, NavLink } from "reactstrap"
import useSimpleAuth from "../../hooks/useSimpleAuth"
import "./NavBar.css"
import worldBook from "../../images/world-book.png"
import { useHistory } from "react-router-dom"

// This function is responsible for rendering the NavBar component
export const NavBar = () => {
    const { isAuthenticated, logout, getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const history = useHistory()
    return (
        <div className="navContainer">
            <div className="nav-header">
                <div className="nav-headerLeft">
                    <h1 id="bookKeeper" onClick={() => history.push("/home")} style={{ cursor: "pointer" }} className="nav-header__title"><img id="navImg" src={worldBook} alt="a stack of books" /> Bookkeeper</h1>
                    <div style={{ fontStyle: "italic" }}>A user driven, open-source book repository</div>
                </div>
                <div className="nav-headerRight">
                    <h3 className="nav-header__welcome">Welcome, {currentUser.firstName}</h3>
                </div>
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
                            }} className="navbar__link" href="/login">Logout</NavLink>
                            : <NavLink className="navbar__link" href="/login">Login</NavLink>
                    }
                </NavItem>
                <NavItem active className="navbar__item">
                    {
                        !isAuthenticated()
                            ? <NavLink className="navbar__link" href="/register">Register</NavLink>
                            : ""
                    }
                </NavItem>
            </Nav>
        </div>
    )
}