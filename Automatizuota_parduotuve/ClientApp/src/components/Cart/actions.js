import { ADD_ITEM, REMOVE_ITEM, REMOVE_ALL} from './actionTypes';

export const addItem = (item) => ({
  type: ADD_ITEM,
  item,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  id,
});

export const removeAll = (id) => ({
  type: REMOVE_ALL,
  id,
});