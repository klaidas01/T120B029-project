import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Home/Layout';
import ItemList from './components/Items/ItemList';
import Cart from './components/Cart/Cart';
import CreateItem from './components/Items/ItemForm/CreateItem';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    return (
      <Provider store={store}>
        <Layout>
          <Switch>\
            <Redirect exact from="/" to="items" />
            <Route exact path='/items' component={ItemList} />
            <Route exact path='/items/create' component={CreateItem} />
            <Route exact path='/cart' component={Cart} />
          </Switch>
        </Layout>
      </Provider>
    );
}

export default App;