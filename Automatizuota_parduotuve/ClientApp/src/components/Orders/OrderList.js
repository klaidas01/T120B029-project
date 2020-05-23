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
import { useSnackbar } from 'notistack';
import Can from '../Home/Can';
import { AuthConsumer } from "../../authContext";

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

const OrderList = ({user}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        fetchData(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const fetchData = async (user) => {
        try {
          if (user.role !== 'user')
          {
            const result = await axiosInstance.get('orders');
            setOrders(result.data);
          }
          else {
            const result = await axiosInstance.get('orders/user/' + user.id);
            setOrders(result.data);
          }
          setIsLoading(false);
        }
        catch (e) {
            enqueueSnackbar('Įvyko klaida', {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
                variant: 'error',
            });
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
        fetchData(user);
    }

    const startOrder = async (id) => {
        const config = { headers: {'Content-Type': 'application/json'} };
        await axiosInstance.put('orders/' + id, 1, config);
        fetchData(user);
    }

    const pickupOrder = async (id) => {
        try {
            await axiosInstance.put('orders/pickup/' + id);
            enqueueSnackbar('Užsakymas atsiimtas', {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
                variant: 'success',
              });
            fetchData(user);
        }
        catch (e) {
            enqueueSnackbar('Įvyko klaida', {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
                variant: 'error',
            });
        }
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
      <AuthConsumer>
      {({ user }) => (
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
              <TableCell></TableCell>
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
                <Can
                  role={user.role}
                  perform="orders:collectOrder"
                  data={{state: row.state}}
                  yes={() => (
                    <TableCell ><Button onClick={() => completeOrder(row.id)}>Surinkti užsakymą</Button></TableCell>
                  )}
                  no={() => (
                    <TableCell></TableCell>
                  )}
                />
                <Can
                  role={user.role}
                  perform={"orders:retrieve"}
                  data={{userId: user.id, orderOwnerId: row.userId, state: row.state}}
                  yes={() => (
                    <TableCell ><Button onClick={() => pickupOrder(row.id)}>Atsiimti užsakymą</Button></TableCell>
                  )}
                  no={() => (
                    <TableCell></TableCell>
                  )}
                />
              </ExpandableTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
      )}
    </AuthConsumer>
    );
}

export default OrderList
