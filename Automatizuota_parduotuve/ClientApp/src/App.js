import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/Home/Routes';
import Layout from './components/Home/Layout';
import { SnackbarProvider} from 'notistack';
import Auth from "./Auth";

const App = () => {
  return (
    <Auth>
      <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
          <Layout>
            <Routes />
          </Layout>
        </Provider>
      </SnackbarProvider>
    </Auth>
  );
}

export default App;