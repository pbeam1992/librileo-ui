import React, {useContext} from "react";
import {Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import AuthContext from '../../context/auth/authContext';
import Button from "@material-ui/core/Button";

const Navbar = props => {
    const authContext = useContext(AuthContext);
    const { logout } = authContext;

    return (
        <AppBar position="fixed" color="default">
            <Toolbar>
                <Typography variant='h5' className='text-decoration-none' component={Link} to='/' style={{flexGrow: 1}}>
                    Librileo
                </Typography>
                {!authContext.isAuthenticated && <Button component={Link} to='/login'>Login</Button>}
                {authContext.isAuthenticated && <Button onClick={logout}>Logout</Button>}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;