import {Outlet, Link} from "react-router-dom";

import classes from './MainHeader.module.css'

const MainHeader = () => {
    return <div>
        <header className={classes.header}>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/books'>Books</Link></li>
                <li><Link to='/authors'>Authors</Link></li>
                <li><Link to='/search'>Search</Link></li>
                <li><Link to='/collection'>Book Collection</Link></li>
                <li><Link to='/newBook'>New Book</Link></li>
                <li><Link to='/newAuthor'>New Author</Link></li>
                <li><Link to='/changePassword'>Change Password</Link></li>
            </ul>
        </header>
        <Outlet/>
    </div>


}

export default MainHeader;