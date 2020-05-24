import React, { useState } from 'react';
import RobotForm from './RobotForm';
import { axiosInstance } from '../../../axiosInstance';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
    center: {
        position: 'fixed',
        top: '50%',
        left: '50%',
    },
}));

const CreateRobotForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const onSumbit = (values) => {
        setIsLoading(true);
        const uploadItem = async () => {
            try {
                await axiosInstance.post('robots', values);
                setRedirect(true);
                enqueueSnackbar('Robotas sukurtas', {
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                    variant: 'success',
                });
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
            setIsLoading(false);
        };
        uploadItem();
    };

    if (isLoading) {
        return (
            <div className={classes.center}>
                <CircularProgress />
            </div>
        );
    }
    if (redirect) {
        return <Redirect to="/robots" push />;
    }
    return (
        <RobotForm dataOfCreation="" State={0} Model="" NumberOfCarts={0} SizeOfCart={0} onSubmit={onSumbit} />
    );
};

export default CreateRobotForm;