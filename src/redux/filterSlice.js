import { createSlice } from '@reduxjs/toolkit';

// ініцілюємо стартове значення фільтру
const filterInitialState = '';

// створюємо slice для фільтру контактів
const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setStatusFilter: (state, { payload }) => (state = payload),
  },
});

export const { setStatusFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
