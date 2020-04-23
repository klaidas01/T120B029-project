import React, {useEffect, useState} from 'react';
import {axiosInstance} from '../../axiosInstance';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../Cart/actions';

const useStyles = makeStyles(() => ({
    center: {
      position: 'fixed',
      top: '50%',
      left: '50%',
    },
    headerWrapper: {
        display: 'flex',
    },
    title: {
        textTransform: 'none',
        fontSize: '150%',
        flexGrow: 1,
    },
    createBtn: {
        backgroundColor: 'lightgray',
        color: 'white',
        textTransform: 'none',
        marginTop: '1%',
        marginBottom: '1%',
        paddingLeft: '5%',
        paddingRight: '5%',
    }
  }));
  

const ItemList = ({dispatchAddItem, role}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        try {
          const result = await axiosInstance.get('items');
          setItems(result.data);
        }
        catch (e) {
          console.log(e);
          //Handle get failure
        }
        setIsLoading(false);
    };

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            await axiosInstance.delete('items/' + id);
        }
        catch (e) {
            console.log(e);
            //Handle delete failure
        }
        fetchData();
    };

    if (isLoading) {
        return (
            <div className={classes.center}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
        <div className={classes.headerWrapper}>
            <h1 className={classes.title}>Prekės</h1>
            {role === "admin" && <Button
              className={classes.createBtn}
              variant="outlined"
              component={NavLink}
              to="/items/create"
            >
                Nauja prekė
            </Button>}
        </div>
        <TableContainer component={Paper}>
        <Table aria-label="item table">
          <TableHead>
            <TableRow>
              <TableCell>Pavadinimas</TableCell>
              <TableCell align="right">Kodas</TableCell>
              <TableCell align="right">Kiekis</TableCell>
              <TableCell align="right">Dydis&nbsp;(cm)</TableCell>
              <TableCell align="right">Svoris&nbsp;(g)</TableCell>
              <TableCell align="right">Kaina&nbsp;(€)</TableCell>
              {role === "admin" && <TableCell align="right"></TableCell>}
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.size}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                {role === "admin" && <TableCell align="right"><Button onClick={() => handleDelete(row.id)}>Ištrinti</Button></TableCell>}
                <TableCell align="right"><Button onClick={() => dispatchAddItem({id: row.id, name: row.name, price: row.price, count:1})}>Į krepšelį</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
        dispatchAddItem: actions.addItem,
      },
      dispatch
    )
)(ItemList);