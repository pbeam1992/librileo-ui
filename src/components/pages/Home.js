import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import {Card, StepLabel} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import BasicInformation from "../signContract/BasicInformation";
import ServiceCenter from "../signContract/ServiceCenter";
import RegisterForm from "../user/RegisterForm";
import CardContent from "@material-ui/core/CardContent";
import WarningIcon from '@material-ui/icons/Warning';
import {Link} from "react-router-dom";
import AuthContext from '../../context/auth/authContext';
import ContractContext from '../../context/contract/contractContext';
import AlertContext from '../../context/alert/alertContext';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormQuestion from "../signContract/FormQuestion";
import PreviewContract from "../signContract/PreviewContract";

const Home = ({classes, styles}) => {

    const authContext = useContext(AuthContext);
    const contractContext = useContext(ContractContext);
    const alertContext = useContext(AlertContext);

    const {isAuthenticated} = authContext;
    const {questionData, dynamicQuestionAnswer, setPdf} = contractContext;
    const {setAlert} = alertContext;


    const [activeStep, setActiveStep] = React.useState(0);

    function getSteps() {
        return [0, 1, 2, 3];
    }

    const steps = getSteps();

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <BasicInformation/>;
            case 1:
                return <ServiceCenter handleNext={handleNext}/>;
            case 2:
                return <FormQuestion/>;
            case 3:
                return <PreviewContract/>;
            default:
                throw new Error('Unknown step');
        }
    };

    const handleNext = async () => {
        if (activeStep === 2)
            if (isChildInformed()) {
                await setPdf();
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            } else
                setAlert('Warning', 'Please inform at least one child');
        else
            setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const isChildInformed = () => {
        // Check has a children information
        let childrenQuestion = questionData.filter(m => m.className === 'QuestionChild');

        let childUndefinedCount = 0;
        let falseChildFlagCount = 0;
        for (let i = 0; i < childrenQuestion.length; i++) {
            if (dynamicQuestionAnswer[childrenQuestion[i].id] === undefined)
                childUndefinedCount++;

            if (dynamicQuestionAnswer[childrenQuestion[i].id] === false)
                falseChildFlagCount++;
        }

        if (childUndefinedCount === childrenQuestion.length ||
            falseChildFlagCount === childrenQuestion.length ||
            (childUndefinedCount + falseChildFlagCount === childrenQuestion.length)) {
            return false;
        } else {
            return true;
        }

    };

    return (
        <React.Fragment>
            {!isAuthenticated &&
            <Card style={{paddingTop: 35}}>
                <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        <WarningIcon/> The system will create a new contract with new user registration. If you are
                        already have an account
                        please <Link to='/login'> go to login.</Link>
                    </Typography>
                </CardContent>
            </Card>
            }
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12}>
                        {!isAuthenticated &&
                        <RegisterForm/>}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h4" align="center" style={{marginTop: 40}}>
                            Sign a contract
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel={true}>
                            <Step key={0}>
                                <StepLabel>Personal</StepLabel>
                            </Step>
                            <Step key={1}>
                                <StepLabel>Service Center</StepLabel>
                            </Step>
                            <Step key={2}>
                                <StepLabel>Form questions</StepLabel>
                            </Step>
                            <Step key={3}>
                                <StepLabel>Finished</StepLabel>
                            </Step>
                        </Stepper>
                    </Grid>
                </Grid>

                {getStepContent(activeStep)}

                <div>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                        Back
                    </Button>

                    {activeStep !== 1 &&
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                    >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                    }
                </div>
            </Paper>
        </React.Fragment>

    )
};

export default Home;