import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/logout">Logout</Link>
            <Link to="/changepassword">Change Password</Link>
            <Link to="/product">Product</Link>
            <Link to="/user">User</Link>
        </nav>
    );
}

export default Navbar