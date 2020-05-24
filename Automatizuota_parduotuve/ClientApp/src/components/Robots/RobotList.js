import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../axiosInstance';
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


const RobotList = ({ dispatchAddRobot }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [robots, setRobots] = useState([]);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        try {
            const result = await axiosInstance.get('robots');
            setRobots(result.data);
            setIsLoading(false);
        }
        catch (e) {
            enqueueSnackbar('Something went wrong', {
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                variant: 'error',
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            await axiosInstance.delete('robots/' + id);
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
        <AuthConsumer>
            {({ user }) => (
                <>
                    <div className={classes.headerWrapper}>
                        <h1 className={classes.title}>Robotai</h1>
                        <Can
                            role={user.role}
                            perform="robots:create"
                            yes={() =>
                                <Button
                                    className={classes.createBtn}
                                    variant="outlined"
                                    component={NavLink}
                                    to="/robots/create"
                                >
                                    Naujas robotas
                </Button>
                            }
                        />
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="item table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Data</TableCell>
                                    <TableCell align="right">Būsena</TableCell>
                                    <TableCell align="right">modelis</TableCell>
                                    <TableCell align="right">Krepšelių kiekis</TableCell>
                                    <TableCell align="right">Krepšelio dydis</TableCell>
                                    <Can
                                        role={user.role}
                                        perform="robots:delete"
                                        yes={() =>
                                            <TableCell align="right"></TableCell>
                                        }
                                    />
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {robots.map((row) => (
                                    <TableRow key={row.id}>
                                        
                                        <TableCell align="right">{row.dataOfCreation}</TableCell>
                                        <TableCell align="right">{row.state}</TableCell>
                                        <TableCell align="right">{row.model}</TableCell>
                                        <TableCell align="right">{row.numberOfCarts}</TableCell>
                                        <TableCell align="right">{row.sizeOfCart}</TableCell>
                                        <Can
                                            role={user.role}
                                            perform="robots:delete"
                                            yes={() =>
                                                <TableCell align="right"><Button onClick={() => handleDelete(row.id)}>Ištrinti</Button></TableCell>
                                            }
                                        />
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </AuthConsumer>
    )
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
)(RobotList);