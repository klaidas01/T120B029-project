import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ItemList from '../Items/ItemList';
import OrderList from '../Orders/OrderList';
import Cart from '../Cart/Cart';
import CreateItem from '../Items/ItemForm/CreateItem';
import Callback from './callbackPage';
import HomePage from './Home';
import { AuthConsumer } from "../../authContext";

const Routes = () => {
    return (
        <AuthConsumer>
        {({ user, authenticated }) => (
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path="/callback" component={Callback}/>
                {(user.role !== 'visitor') && <Route exact path='/orders' render={() => <OrderList user={user} />}/>}
                {(user.role === 'admin' || user.role === 'user') && <Route exact path='/items' component={ItemList}/>}
                {(user.role === 'admin') && <Route exact path='/items/create' component={CreateItem} />}
                {(user.role === 'admin' || user.role === 'user') && <Route exact path='/cart' render={() => <Cart user={user} />}/>}
                {(user.role === 'system') && <Redirect to="/orders"/>}
                <Redirect to="/"/>
            </Switch>
        )}
        </AuthConsumer>
    );
}

export default Routes;