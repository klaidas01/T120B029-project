import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Home/Login';
import { SnackbarProvider} from 'notistack';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <Login />
      </Provider>
    </SnackbarProvider>
  );
}

export default App;