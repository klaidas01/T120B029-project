import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Home/Layout';
import Home from './components/Home/Home';
import ItemList from './components/Items/ItemList';
import CreateItem from './components/Items/ItemForm/CreateItem';

const App = () => {
    return (
      <Layout>
        <Switch>\
          <Route exact path='/' component={Home} />
          <Route exact path='/items' component={ItemList} />
          <Route exact path='/items/create' component={CreateItem} />
        </Switch>
      </Layout>
    );
}

export default App;