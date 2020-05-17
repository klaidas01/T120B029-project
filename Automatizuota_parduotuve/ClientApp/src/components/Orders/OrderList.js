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
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Button from '@material-ui/core/Button';

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
  }));

const orderState = {
    0: 'Užsakytas',
    1: 'Vykdomas',
    2: 'Atsiimtas',
    3: 'Paruoštas',
    4: 'Atšauktas',
}

const OrderList = ({role}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        fetchData(role);
      }, [role]);

    const fetchData = async (role) => {
        try {
          if (role !== 'user')
          {
            const result = await axiosInstance.get('orders');
            setOrders(result.data);
          }
          else {
            const result = await axiosInstance.get('orders/user/2');
            setOrders(result.data);
          }
          setIsLoading(false);
        }
        catch (e) {
          console.log(e);
          //Handle get failure
        }
    };

    const getDateString = (datestring) => {
        let date = new Date(datestring);
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() + (offset*60*1000));
        const dateTime = date.toISOString().split('T');
        const time = dateTime[1].split(':');
        return dateTime[0] + ' ' + time[0] + ':' + time[1];
    }

    const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
        const [isExpanded, setIsExpanded] = React.useState(false);
      
        return (
          <>
            <TableRow {...otherProps}>
              <TableCell padding="checkbox">
                <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              {children}
            </TableRow>
            {isExpanded && (
              <TableRow>
                <TableCell padding="checkbox" />
                {expandComponent}
              </TableRow>
            )}
          </>
        );
    };

    const completeOrder = async (id) => {
        const config = { headers: {'Content-Type': 'application/json'} };
        await axiosInstance.put('orders/' + id, 3, config);
        fetchData();
    }

    const startOrder = async (id) => {
        const config = { headers: {'Content-Type': 'application/json'} };
        await axiosInstance.put('orders/' + id, 1, config);
        fetchData();
    }

    const collectOrder = async (id) => {
        await axiosInstance.put('orders/collect/' + id);
        fetchData();
    }

    const OrderInformation = ({order}) => {
        return (
            <>
            Užsakymo spintelės numeris: {order.lockerId}
            <div className={classes.headerWrapper}>
                Užsakymo prekės:
            </div>
            <TableContainer component={Paper}>
        <Table aria-label="item table">
          <TableHead>
            <TableRow>
              <TableCell>Pavadinimas</TableCell>
              <TableCell align="right">Kodas</TableCell>
              <TableCell align="right">Dydis&nbsp;(cm)</TableCell>
              <TableCell align="right">Svoris&nbsp;(g)</TableCell>
              <TableCell align="right">Kaina&nbsp;(€)</TableCell>
              <TableCell align="right">Kiekis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.itemSets.map((row) => (
              <TableRow key={row.item.id}>
                <TableCell component="th" scope="row">
                  {row.item.name}
                </TableCell>
                <TableCell align="right">{row.item.code}</TableCell>
                <TableCell align="right">{row.item.size}</TableCell>
                <TableCell align="right">{row.item.weight}</TableCell>
                <TableCell align="right">{row.item.price}</TableCell>
                <TableCell align="right">{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
            </>
        )
    }

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
            <h1 className={classes.title}>Užsakymai</h1>
        </div>
        <TableContainer component={Paper}>
        <Table aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Užsakymo data</TableCell>
              <TableCell align="right">Numatyta įvykdymo data</TableCell>
              <TableCell align="right">Būsena</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <ExpandableTableRow
              key={row.id}
              expandComponent={<TableCell colSpan="5">{<OrderInformation order={row}/>}</TableCell>}
            >
                <TableCell component="th" scope="row">
                  {getDateString(row.orderDate)}
                </TableCell>
                <TableCell align="right">{getDateString(row.predictedCompletionTime)}</TableCell>
                <TableCell align="right">{orderState[row.state]}</TableCell>
                {role === "system" && row.state === 0 && <TableCell ><Button onClick={() => startOrder(row.id)}>Užsakymas pradėtas</Button></TableCell>}
                {role === "system" && row.state === 1 && <TableCell ><Button onClick={() => completeOrder(row.id)}>Užsakymas įvykdytas</Button></TableCell>}
                {role !== "system" && row.state === 3 && <TableCell ><Button onClick={() => collectOrder(row.id)}>Atsiimti užsakymą</Button></TableCell>}
              </ExpandableTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    );
}

export default OrderList