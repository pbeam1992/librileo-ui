import React, {useContext, useEffect} from 'react';
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel";

// Context
import ContractContext from '../../context/contract/contractContext';
import AuthContext from '../../context/auth/authContext';

const BasicInformation = props => {

    const authContext = useContext(AuthContext);
    const {user, setUserInformation} = authContext;

    const contractContext = useContext(ContractContext);
    const {getSocialBenefits, socialBenefits} = contractContext;

    useEffect(() => {
        getSocialBenefits();
    }, []);

    const {firstname, lastname, street, socialBenefitId, postcode, title} = user;

    const inputChange = e => {
        setUserInformation(
            [e.target.name], e.target.value
        );
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="title" value={title} onChange={inputChange}>
                    <FormControlLabel value="mr" control={<Radio/>} label="Mr."/>
                    <FormControlLabel value="mrs" control={<Radio/>} label="Mrs."/>
                </RadioGroup>
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    label="Geburtsdatum"
                    name='dateOfBirth'
                    onChange={inputChange}
                    fullWidth={true}
                    type='date'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField label="Nachname" name='lastname' value={lastname} onChange={inputChange}
                           fullWidth required/>
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField label="Vorname" name='firstname' value={firstname} onChange={inputChange} fullWidth/>
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField label="Geburtsname" fullWidth/>
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField label="Geburtsort" fullWidth/>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'h5'}>
                    Address
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Street" name='street' value={street} onChange={inputChange} fullWidth/>
            </Grid>
            <Grid item xs={12} lg={4}>
                <TextField label="Hausnummer" fullWidth/>
            </Grid>
            <Grid item xs={12} lg={4}>
                <TextField label="PLZ" name='postcode' value={postcode} onChange={inputChange} fullWidth/>
            </Grid>
            <Grid item xs={12} lg={4}>
                <TextField label="Ort" fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Bezogene Sozialleistung</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    name='socialBenefitId'
                    value={socialBenefitId}
                    onChange={inputChange}
                >
                    {socialBenefits.map(item => {
                        return <MenuItem key={item.id} value={item.id}>{item.key}</MenuItem>
                    })}
                </Select>
            </Grid>
        </Grid>

    )
};

export default BasicInformation;