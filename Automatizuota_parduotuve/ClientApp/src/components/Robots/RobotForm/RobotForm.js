import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';

const robotSchema = yup.object({
    DataOfCreation: yup
        .date()
        .required('Data yra privaloma.'),
    State: yup
        .number()
        .required('State yra privaloma')
        .integer(),
    Model: yup
        .string()
        .required('Modelis yra privalomas.')
        .max(20, 'Modelio pavadinimas per ilgas.(daugiausiai 20 simbolių)'),
    NumberOfCarts: yup
        .number()
        .required('Krepseliu kiekis yra privalomas')
        .positive()
        .integer(),
    SizeOfCart: yup
        .number()
        .required('Krepselio dydis yra privalomas'),
});

const useStyles = makeStyles(() => ({
    header: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
        fontSize: '150%',
        marginTop: '1%',
        marginBottom: '1%',
    },
    saveButton: {
        backgroundColor: 'lightgray',
        color: 'white',
        textTransform: 'none',
        marginTop: '1%',
        marginBottom: '1%',
        marginRight: '2%',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    cancelButton: {
        color: 'lightgray',
        borderColor: 'lightgray',
        textTransform: 'none',
        marginTop: '1%',
        marginBottom: '1%',
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    formBox: {
        borderColor: 'gray',
        marginBottom: '1%',
    },
    boxTitleContainer: {
        fontSize: '150%',
        backgroundColor: 'whitesmoke',
        borderRadius: '16px 16px 0px 0px',
    },
    boxTitle: {
        padding: '1%',
        paddingLeft: '2%',
    },
    formFields: {
        paddingLeft: '2%',
        paddingBottom: '2%',
        paddingRight: '2%',
        flexWrap: 'wrap',
        height: '100%',
    },
    input: {
        paddingTop: '3%',
    },
    inputTitle: {
        display: 'block',
    },
    error: {
        color: 'red',
    },
    textField: {
        paddingTop: '1%',
        minWidth: '70%',
        color: 'secondary',
    },
    section1: {
        alignSelf: 'flex-start',
    },
    section2: {
        flexWrap: 'wrap',
        minWidth: '180px',
    },
}));

const RobotForm = ({ dataOfCreation, state, model, numberOfCarts, sizeOfCart, onSubmit }) => {
    const classes = useStyles();

    const preventNonNumericalInput = (e) => {
        e = e || window.event;
        const charCode = typeof e.which === 'undefined' ? e.keyCode : e.which;
        const charStr = String.fromCharCode(charCode);
        if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
    };

    return (
        <Formik
            initialValues={{
                DataOfCreation: dataOfCreation,
                State: state,
                Model: model,
                NumberOfCarts: numberOfCarts,
                SizeOfCart: sizeOfCart,
            }}
            validationSchema={robotSchema}
            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            {(formikProps) => (
                <>
                    <header className={classes.header}>
                        <h1 className={classes.title}>Robotas</h1>
                        <Button className={classes.saveButton} onClick={formikProps.handleSubmit}>
                            Išsaugoti
                        </Button>
                        <Button
                            className={classes.cancelButton}
                            variant="outlined"
                            component={NavLink}
                            to="/robots"
                        >
                            Atšaukti
                        </Button>
                    </header>
                    <Box className={classes.formBox} border={1} borderRadius="16px 16px 0px 0px">
                        <div className={classes.boxTitleContainer}>
                            <div className={classes.boxTitle}>Roboto informacija</div>
                        </div>
                        <Grid container className={classes.formFields} spacing={2}>
                            <Grid item sm={6} className={classes.section1}>
                                <div className={classes.input}>
                                    <div className={classes.inputTitle}>Data</div>
                                    <TextField
                                        className={classes.textField}
                                        onChange={formikProps.handleChange('DataOfCreation')}
                                        value={formikProps.values.DataOfCreation}
                                        variant="outlined"
                                        type="date"
                                        size="small"
                                    />
                                    {formikProps.errors.DataOfCreation && formikProps.touched.DataOfCreation ? (
                                        <div className={classes.error}>{formikProps.errors.DataOfCreation}</div>
                                    ) : null}
                                    <div className={classes.input}>
                                        <div className={classes.inputTitle}>Busena</div>
                                        <TextField
                                            className={classes.textField}
                                            onChange={formikProps.handleChange('State')}
                                            value={formikProps.values.State}
                                            variant="outlined"
                                            type="number"
                                            onKeyPress={preventNonNumericalInput}
                                            inputProps={{ min: '0' }}
                                            size="small"
                                        />
                                        {formikProps.errors.State && formikProps.touched.State ? (
                                            <div className={classes.error}>{formikProps.errors.State}</div>
                                        ) : null}
                                    </div>
                                    <div className={classes.input}>
                                        <div className={classes.inputTitle}>Modelis</div>
                                        <TextField
                                            className={classes.textField}
                                            onChange={formikProps.handleChange('Model')}
                                            value={formikProps.values.Model}
                                            variant="outlined"                                        
                                            size="small"
                                        />
                                        {formikProps.errors.Model && formikProps.touched.Model ? (
                                            <div className={classes.error}>{formikProps.errors.Model}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </Grid>

                            <Grid item sm={6} className={classes.section2}>
                                <div className={classes.input}>
                                    <div className={classes.inputTitle}>Krepseliu kiekis</div>
                                    <TextField
                                        className={classes.textField}
                                        onChange={formikProps.handleChange('NumberOfCarts')}
                                        value={formikProps.values.NumberOfCarts}
                                        variant="outlined"
                                        size="small"
                                    />
                                    {formikProps.errors.NumberOfCarts && formikProps.touched.NumberOfCarts ? (
                                        <div className={classes.error}>{formikProps.errors.NumberOfCarts}</div>
                                    ) : null}
                                    <div className={classes.input}>
                                        <div className={classes.inputTitle}>Krepselio dydis</div>
                                        <TextField
                                            className={classes.textField}
                                            onChange={formikProps.handleChange('SizeOfCart')}
                                            value={formikProps.values.SizeOfCart}
                                            variant="outlined"
                                            type="number"
                                            inputProps={{ min: '0' }}
                                            size="small"
                                        />
                                        {formikProps.errors.SizeOfCart && formikProps.touched.SizeOfCart ? (
                                            <div className={classes.error}>{formikProps.errors.SizeOfCart}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}
        </Formik>
    );
};

export default RobotForm;
