import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';

const itemSchema = yup.object({
  Name: yup
    .string()
    .required('Prekės pavadinimas privalomas.')
    .max(20, 'Prekės pavadinimas per ilgas.(daugiausiai 20 simbolių)'),
  Code: yup
    .string()
    .required('Prekės kodas privalomas.')
    .max(20, 'Prekės kodas per ilgas.(daugiausiai 20 simbolių)'),
  Amount: yup
    .number()
    .positive('Kiekis turi būti neneigiamas skaičius')
    .required('Kiekis privalomas'),
  Size: yup
    .string()
    .required('Prekės dydis privalomas.')
    .max(20, 'Prekės dydis per ilgas.(daugiausiai 20 simbolių)'),
  Weight: yup
    .number()
    .required('Svoris turi būti neneigiamas skaičius'),
  Price: yup
    .number()
    .required('Kaina turi būti neneigiamas skaičius'),
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

const ItemForm = ({ name, code, amount, size, weight, price, onSubmit }) => {
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
        Name: name,
        Code: code,
        Amount: amount,
        Size: size,
        Weight: weight,
        Price: price,
      }}
      validationSchema={itemSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {(formikProps) => (
        <>
          <header className={classes.header}>
            <h1 className={classes.title}>Prekė</h1>
            <Button className={classes.saveButton} onClick={formikProps.handleSubmit}>
              Išsaugoti
            </Button>
            <Button
              className={classes.cancelButton}
              variant="outlined"
              component={NavLink}
              to="/items"
            >
              Atšaukti
            </Button>
          </header>
          <Box className={classes.formBox} border={1} borderRadius="16px 16px 0px 0px">
            <div className={classes.boxTitleContainer}>
              <div className={classes.boxTitle}>Prekės informacija</div>
            </div>
            <Grid container className={classes.formFields} spacing={2}>
              <Grid item sm={6} className={classes.section1}>
                <div className={classes.input}>
                  <div className={classes.inputTitle}>Pavadinimas</div>
                  <TextField
                    className={classes.textField}
                    onChange={formikProps.handleChange('Name')}
                    value={formikProps.values.Name}
                    variant="outlined"
                    size="small"
                  />
                  {formikProps.errors.Name && formikProps.touched.Name ? (
                    <div className={classes.error}>{formikProps.errors.Name}</div>
                  ) : null}
                <div className={classes.input}>
                  <div className={classes.inputTitle}>Kodas</div>
                  <TextField
                    className={classes.textField}
                    onChange={formikProps.handleChange('Code')}
                    value={formikProps.values.Code}
                    variant="outlined"
                    size="small"
                  />
                  {formikProps.errors.Code && formikProps.touched.Code ? (
                    <div className={classes.error}>{formikProps.errors.Code}</div>
                  ) : null}
                </div>
                <div className={classes.input}>
                  <div className={classes.inputTitle}>Kiekis</div>
                  <TextField
                    className={classes.textField}
                    onChange={formikProps.handleChange('Amount')}
                    value={formikProps.values.Amount}
                    variant="outlined"
                    type="number"
                    onKeyPress={preventNonNumericalInput}
                    inputProps={{ min: '0' }}
                    size="small"
                  />
                  {formikProps.errors.Amount && formikProps.touched.Amount ? (
                    <div className={classes.error}>{formikProps.errors.Amount}</div>
                  ) : null}
                </div>
                </div>
              </Grid>
              <Grid item sm={6} className={classes.section2}>
                <div className={classes.input}>
                  <div className={classes.inputTitle}>Dydis</div>
                  <TextField
                    className={classes.textField}
                    onChange={formikProps.handleChange('Size')}
                    value={formikProps.values.Size}
                    variant="outlined"
                    size="small"
                  />
                  {formikProps.errors.Size && formikProps.touched.Size ? (
                    <div className={classes.error}>{formikProps.errors.Size}</div>
                  ) : null}
                <div className={classes.input}>
                  <div className={classes.inputTitle}>Svoris</div>
                  <TextField
                    className={classes.textField}
                    onChange={formikProps.handleChange('Weight')}
                    value={formikProps.values.Weight}
                    variant="outlined"
                    type="number"
                    inputProps={{ min: '0' }}
                    size="small"
                  />
                  {formikProps.errors.Weight && formikProps.touched.Weight ? (
                    <div className={classes.error}>{formikProps.errors.Weight}</div>
                  ) : null}
                </div>
                <div className={classes.input}>
                  <div className={classes.inputTitle}>Kaina</div>
                  <TextField
                    className={classes.textField}
                    onChange={formikProps.handleChange('Price')}
                    value={formikProps.values.Price}
                    variant="outlined"
                    type="number"
                    inputProps={{ min: '0' }}
                    size="small"
                  />
                  {formikProps.errors.Price && formikProps.touched.Price ? (
                    <div className={classes.error}>{formikProps.errors.Price}</div>
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

export default ItemForm;
