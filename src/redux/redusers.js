import { combineReducers } from 'redux';
import { tasksReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

// обєднуємо слайси в один редюсер
export const rootReducer = combineReducers({
  contacts: tasksReducer,
  filters: filterReducer,
});
