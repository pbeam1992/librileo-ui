import React, {useContext} from "react";
import {Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import AuthContext from '../../context/auth/authContext';
import Button from "@material-ui/core/Button";

// Icons
import TableChartIcon from '@material-ui/icons/TableChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

const Navbar = props => {
    const authContext = useContext(AuthContext);
    const {logout} = authContext;

    return (
        <AppBar position="fixed" color="default">
            <Toolbar>
                <Typography variant='h5' className='text-decoration-none' component={Link} to='/' style={{flexGrow: 1}}>
                    Librileo
                </Typography>

                {!authContext.isAuthenticated &&
                <Button component={Link} to='/login' startIcon={<PersonIcon/>}>Login</Button>}
                {authContext.isAuthenticated &&
                <React.Fragment>
                    <Button component={Link} to='myContracts' startIcon={<TableChartIcon/>}>My Contracts</Button>
                    <Button onClick={() => logout()} startIcon={<ExitToAppIcon/>}>Logout</Button>
                </React.Fragment>
                }
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;