import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Components
import Home from "./components/pages/Home";

// Stage
import AuthState from "./context/auth/AuthState";

// Styles
import './App.css';
import useStyles from "./components/appStyles";
import Login from "./components/pages/Login";
import AlertState from "./context/alert/AlertState";
import Navbar from "./components/layout/Navbar";
import ContractState from "./context/contract/ContractState";
import Alerts from "./components/layout/Alerts";
import MyContract from "./components/user/MyContract";

const App = () => {
    const classes = useStyles();

    return (
        <AuthState>
            <AlertState>
                <ContractState>
                    <Alerts />
                    <Router>
                        <Navbar classes={classes}/>
                        <main className={classes.layout}>
                            <Switch>
                                <Route exact path='/'>
                                    <Home classes={classes} />
                                </Route>
                                <Route exact path='/login' component={Login}/>
                                <Route exact path='/myContracts' component={MyContract}/>
                            </Switch>
                        </main>
                    </Router>
                </ContractState>
            </AlertState>
        </AuthState>
    );
}

export default App;
