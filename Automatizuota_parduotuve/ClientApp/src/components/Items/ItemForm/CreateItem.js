import React, { useState } from 'react';
import ItemForm from './ItemForm';
import { axiosInstance } from '../../../axiosInstance';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  center: {
    position: 'fixed',
    top: '50%',
    left: '50%',
  },
}));

const CreateItemForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  const onSumbit = (values) => {
    setIsLoading(true);
    const uploadItem = async () => {
      try {
        await axiosInstance.post('items', values);
        setRedirect(true);
      }
      catch (e) {
          console.log(e)
          //Handle post failure
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
    return <Redirect to="/items" push />;
  }
  return (
    <ItemForm name="" code="" amount={1} size="" weight={0} price={0} onSubmit={onSumbit} />
  );
};

export default CreateItemForm;