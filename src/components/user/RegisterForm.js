import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";

const RegisterForm = () => {
    return (
        <React.Fragment>
            <Typography variant='h5'>
                A Register account information.
            </Typography>
            <Grid container={true} spacing={3}>
                <Grid item xs={12} lg={12}>
                    <TextField label='Email' fullWidth></TextField>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TextField label='Password' fullWidth type={'password'}></TextField>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TextField label='Confirm Password' fullWidth type={'password'}></TextField>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default RegisterForm;