import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import md5 from "md5";
import {Link, Redirect} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";


const Login = (props) => {
    const authContext = useContext(AuthContext);
    const {login, isAuthenticated, error} = authContext;

    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (error !== null) {
            console.log('Is in error function');
            setAlert('Login failed', 'Please check email and password!');
        }
    }, [error]);

    const {email, password} = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        const hashPassword = md5(password);
        login({email, password: hashPassword});
    };

    if (isAuthenticated)
        return <Redirect to={'/'}/>;

    return (
        <React.Fragment>

            <Grid container style={{textAlign: "center", paddingTop: 40}}>
                <Grid item xs={12}>
                    <Typography variant='h5' gutterBottom>
                        Login
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={onSubmit}>
                        <Grid container={true} spacing={3}>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    variant='outlined'
                                    label='Email'
                                    fullWidth
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    variant='outlined'
                                    label='Password'
                                    name='password'
                                    fullWidth
                                    type={'password'}
                                    value={password}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12} style={{textAlign: "left"}}>
                                <Button variant='contained' type={'submit'} color='primary'>Login</Button>
                                &nbsp;&nbsp;
                                <Link to='/'>
                                    or goto sign a contract with create a new user.
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default Login;