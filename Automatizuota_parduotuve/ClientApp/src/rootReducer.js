import { combineReducers } from 'redux';

import cart from './components/Cart/reducer';

const rootReducer = combineReducers({
  cart,
});

export default rootReducer;
