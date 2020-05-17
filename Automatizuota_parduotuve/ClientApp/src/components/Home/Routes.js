import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ItemList from '../Items/ItemList';
import OrderList from '../Orders/OrderList';
import Cart from '../Cart/Cart';
import CreateItem from '../Items/ItemForm/CreateItem';

const Routes = ({role}) => {
    return (
        <Switch>
            {role !== 'system' && <Route exact path='/items' render={() => <ItemList role={role} />}/>}
            <Route exact path='/orders' render={() => <OrderList role={role} />}/>
            {role === "admin" && <Route exact path='/items/create' component={CreateItem} />}
            {role !== 'system' && <Route exact path='/cart' render={() => <Cart role={role} />}/>}
            {role === 'system' && <Redirect to="/orders" />}
            <Redirect to="/items" />
        </Switch>
    );
}

export default Routes;