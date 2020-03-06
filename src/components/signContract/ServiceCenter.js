import React, {useContext, useEffect} from "react";
import AuthContext from '../../context/auth/authContext';
import ContractContext from '../../context/contract/contractContext';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {Divider, ListItemIcon} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ListSubheader from "@material-ui/core/ListSubheader";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";

const ServiceCenter = props => {

    const authContext = useContext(AuthContext);
    const {user, setUserInformation} = authContext;

    const contractContext = useContext(ContractContext);
    const {getServiceCenters, getMatchedFormular, serviceCenters} = contractContext;

    useEffect(() => {
        getServiceCenters(user.postcode);
    }, []);

    const serviceCenterSelect = async serviceCenterId => {
        setUserInformation('serviceCenterId', serviceCenterId);
        await getMatchedFormular(user.socialBenefitId, serviceCenterId);
        props.handleNext();
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Alert severity="warning">Service centers that available base on your Postcode.</Alert>
            </Grid>
            <Grid item xs={12}>
                <List>
                    <ListSubheader>
                    </ListSubheader>
                    {serviceCenters.map(item => {
                        return (
                            <React.Fragment>
                                <ListItem key={item.id} button onClick={() => serviceCenterSelect(item.id)}>
                                    <ListItemText primary={item.key}/>
                                    <ListItemIcon>
                                        <NavigateNextIcon/>
                                    </ListItemIcon>
                                </ListItem>
                                <Divider/>
                            </React.Fragment>
                        )
                    })}
                </List>
            </Grid>

        </Grid>
    );
};

export default ServiceCenter;