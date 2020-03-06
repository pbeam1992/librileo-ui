import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";

// Context
import AuthContext from '../../context/auth/authContext';

const RegisterForm = () => {

    const authContext = useContext(AuthContext);
    const {registerUser: {email, password, confirmPassword}, setRegisterInformation} = authContext;

    const inputChange = e => {
        setRegisterInformation(
            [e.target.name], e.target.value
        );
    };

    return (
        <React.Fragment>
            <Typography variant='h5'>
                A Register account information.
            </Typography>
            <Grid container={true} spacing={3}>
                <Grid item xs={12} lg={12}>
                    <TextField label='Email'
                               name='email'
                               value={email}
                               onChange={inputChange}
                               required
                               fullWidth/>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TextField label='Password'
                               name='password'
                               value={password}
                               onChange={inputChange}
                               fullWidth
                               type={'password'}
                               required/>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TextField label='Confirm Password'
                               name='confirmPassword'
                               value={confirmPassword}
                               onChange={inputChange} fullWidth
                               required
                               type={'password'}/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default RegisterForm;