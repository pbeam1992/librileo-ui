import React, {useContext, useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from '@material-ui/core/Paper';
import TableBody from "@material-ui/core/TableBody";

// Context
import AuthContext from '../../context/auth/authContext';
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const MyContract = () => {

    const authContext = useContext(AuthContext);
    const {loadMyContracts, myContracts, sendEmail, isAuthenticated} = authContext;

    useEffect(() => {
        loadMyContracts();
    }, []);




    const gotoPdf = (link) => {
        const url = 'http://stage1.pimcore.testanwendungen.de' + link;
        window.open(url, '_blank');
    };

    const classes = useStyles();

    if (!isAuthenticated)
        return <Redirect to='login'/>

    return (
        <TableContainer component={Paper} style={{marginTop: 35}}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>View and Download</TableCell>
                        <TableCell>Send Email</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {myContracts && myContracts.map(row => (
                        <TableRow key={row.key}>
                            <TableCell>
                                <Button onClick={() => gotoPdf(row.pdfLink)}>View</Button>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => sendEmail(row.id)}>Send to email</Button>
                            </TableCell>
                            <TableCell>{row.firstname} {row.lastname}</TableCell>
                            <TableCell>{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default MyContract;