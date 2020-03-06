import React, {useContext, useEffect} from "react";

// Context
import ContractContext from '../../context/contract/contractContext';
import AuthContext from '../../context/auth/authContext';
import {TextField} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(3)
    }
}));

const FormQuestion = props => {
    const classes = useStyles();
    const contractContext = useContext(ContractContext);
    const authContext = useContext(AuthContext);

    const {getQuestions, questionData, formId, setDynamicFormInput, dynamicQuestionAnswer} = contractContext;
    const {user} = authContext;

    useEffect(() => {
        getQuestions(formId);
    }, []);

    const handleChange = e => {
        if (e.target.type === 'checkbox')
            setDynamicFormInput(
                [e.target.name], e.target.checked
            );
        else
            setDynamicFormInput(
                [e.target.name], e.target.value
            );
    };

    const renderSelection = question => {
        return (
            <Grid item xs={12}>
                <FormControl key={question.id} fullWidth>
                    <InputLabel shrink id={question.label}>{question.label}</InputLabel>
                    <Select
                        required
                        labelId={question.label}
                        id={question.id.toString()}
                        name={question.id.toString()}
                        value={dynamicQuestionAnswer[question.id] ? dynamicQuestionAnswer[question.id] : 0}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value={0}>
                            <em>Please select</em>
                        </MenuItem>
                        {
                            question.childs.map((child) =>
                                <MenuItem key={child.id} value={child.id}>{child.label}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>

        )
    };

    const renderMultiple = question => {
        return (
            <Grid item xs={12}>
                <FormControl key={question.id} component="fieldset">
                    <FormLabel component="legend">{question.label}</FormLabel>
                    <FormGroup>
                        {
                            question.childs.map((child) =>
                                <FormControlLabel
                                    key={child.id}
                                    control={<Checkbox name={child.id.toString()}
                                                       checked={dynamicQuestionAnswer[child.id] ? dynamicQuestionAnswer[child.id] : false}
                                                       onChange={handleChange}/>}
                                    label={child.label}
                                />
                            )
                        }
                    </FormGroup>
                </FormControl>
            </Grid>
        )
    };

    const renderText = question => {
        return (
            <Grid item xs={12}>
                <TextField key={question.id}
                           label={question.label}
                           name={question.id.toString()}
                           value={dynamicQuestionAnswer[question.id] ? dynamicQuestionAnswer[question.id] : ''}
                           onChange={handleChange}
                           fullWidth
                           required/>
            </Grid>
        )
    };

    const renderDate = question => {
        return (
            <Grid item xs={12}>
                <TextField
                    label={question.label}
                    name={question.id.toString()}
                    value={dynamicQuestionAnswer[question.id] ? dynamicQuestionAnswer[question.id] : ''}
                    onChange={handleChange}
                    fullWidth
                    type='date'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
            </Grid>
        );
    };

    const renderBoolean = question => {
        return (
            <Grid item xs={12}>
                <FormLabel component="legend">{question.label}</FormLabel>
                <RadioGroup
                    required
                    aria-label="gender"
                    name={question.id.toString()}
                    value={dynamicQuestionAnswer[question.id] ? dynamicQuestionAnswer[question.id] : ''}
                    onChange={handleChange}
                >
                    {
                        question.childs.map((child) =>
                            <FormControlLabel key={child.id} value={child.id.toString()} control={<Radio/>}
                                              label={child.label}/>
                        )
                    }
                </RadioGroup>
            </Grid>
        )
    };

    const renderChild = question => {
        return (
            <Grid item xs={12}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Grid container justify='space-between' alignItems='center'>
                            <Typography className={classes.title} color="textSecondary">
                                {question.label}
                            </Typography>
                            <Checkbox name={question.id.toString()}
                                      checked={dynamicQuestionAnswer[question.id] ? dynamicQuestionAnswer[question.id] : false}
                                      onChange={handleChange}/>
                        </Grid>
                        {dynamicQuestionAnswer[question.id] &&
                        <React.Fragment>
                            {
                                question.childs.map(child => {
                                    if (child.className === 'QuestionText')
                                        return renderText(child);
                                    else if (child.className === 'QuestionDate')
                                        return renderDate(child);
                                    else
                                        return <p>No child data required</p>;
                                })
                            }
                        </React.Fragment>
                        }
                    </CardContent>
                </Card>
            </Grid>
        )
    };

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {questionData.map((question) => {
                    if (question.className === 'QuestionSelection')
                        return renderSelection(question);
                    else if (question.className === 'QuestionMultiple')
                        return renderMultiple(question);
                    else if (question.className === 'QuestionText')
                        return renderText(question);
                    else if (question.className === 'QuestionDate')
                        return renderDate(question);
                    else if (question.className === 'QuestionBoolean')
                        return renderBoolean(question);
                    else if (question.className === 'QuestionChild')
                        return renderChild(question);
                    // else
                    //     return <p>This message will appear when question data is not correctly.
                    //         (Message: {question.className} )</p>
                })}

            </Grid>
        </React.Fragment>
    )
};

export default FormQuestion;