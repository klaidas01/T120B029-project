import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ItemList from '../Items/ItemList';
import Cart from '../Cart/Cart';
import CreateItem from '../Items/ItemForm/CreateItem';

const Routes = ({role}) => {
    return (
        <Switch>
            <Route exact path='/items' render={() => <ItemList role={role} />}/>
            {role === "admin" && <Route exact path='/items/create' component={CreateItem} />}
            <Route exact path='/cart' render={() => <Cart role={role} />}/>
            <Redirect to="/items" />
        </Switch>
    );
}

export default Routes;