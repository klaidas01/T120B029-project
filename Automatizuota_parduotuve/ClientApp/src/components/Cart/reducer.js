import { ADD_ITEM, REMOVE_ITEM, REMOVE_ALL} from './actionTypes';

export default (state = { items: [], totalPrice: 0}, action) => {
    switch (action.type) {
      case ADD_ITEM:
        if (state.items.some((item) => item.id === action.item.id )){
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.item.id ? { ...item, count: item.count + 1 } : item
                ),
                totalPrice: parseFloat((state.totalPrice + action.item.price).toFixed(2)),
            }
        }
        else {
            return {
                ...state,
                items: [...state.items, action.item],
                totalPrice: parseFloat((state.totalPrice + action.item.price).toFixed(2)),
            }
        }
      case REMOVE_ITEM: {
            const stateItem = state.items.find(x => x.id === action.id);
            if (stateItem.count > 1){
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.id ? { ...item, count: item.count - 1 } : item
                    ),
                    totalPrice: parseFloat((state.totalPrice - stateItem.price).toFixed(2)),
                }
            }
            return {
            ...state,
            items: state.items.filter(item => item.id !== action.id),
            totalPrice: parseFloat((state.totalPrice - stateItem.price).toFixed(2)),
            };
        }
      case REMOVE_ALL: {
            const stateItem = state.items.find(x => x.id === action.id);
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.id),
                totalPrice: parseFloat((state.totalPrice - (stateItem.price * stateItem.count)).toFixed(2)),
            };
        }
      default:
        return state;
    }
  };
  