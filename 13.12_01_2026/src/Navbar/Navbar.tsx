import { NavLink } from "react-router";
import "./style.scss";

export function Navbar() {
    return (
        <nav className="navbar">
            <NavLink className="navbar-element" to="/">Home</NavLink>
            <NavLink className="navbar-element" to="/post">Posts</NavLink>
            <NavLink className="navbar-element" to="/category">Categories</NavLink>
        </nav>
    )
}