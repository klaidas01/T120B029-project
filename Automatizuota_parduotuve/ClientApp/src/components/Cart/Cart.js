import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

const useStyles = makeStyles(() => ({
    headerWrapper: {
        display: 'flex',
    },
    title: {
        textTransform: 'none',
        fontSize: '150%',
        flexGrow: 1,
    }
  }));
  

const Cart = ({dispatchRemoveItem, dispatchRemoveAll, dispatchAddItem}) => {

    const cartItems = useSelector((state) => state.cart.items);
    const cartPrice = useSelector((state) => state.cart.totalPrice);
    const classes = useStyles();

    return (
        <>
        <div className={classes.headerWrapper}>
            <h1 className={classes.title}>Krepšelis</h1>
        </div>
        <TableContainer component={Paper}>
        <Table aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell>Pavadinimas</TableCell>
              <TableCell>Kaina&nbsp;(€)</TableCell>
              <TableCell>Kiekis</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell><Button onClick = {() => {dispatchAddItem(row)}}>Pridėti</Button></TableCell>
                <TableCell><Button onClick = {() => {dispatchRemoveItem(row.id)}}>Pašalinti</Button></TableCell>
                <TableCell><Button onClick = {() => {dispatchRemoveAll(row.id)}}>Pašalinti visus</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        Bendra kaina: {cartPrice}
      </div>
      </>
    );
}

export default connect(
  (state) => ({
    items: state.cart,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        dispatchRemoveItem: actions.removeItem,
        dispatchRemoveAll: actions.removeAll,
        dispatchAddItem: actions.addItem,
      },
      dispatch
    )
)(Cart);