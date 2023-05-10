import { createSlice } from '@reduxjs/toolkit';
// Імпортуємо операцію
import { addContacts, deleteContacts, fetchContacts } from './operations';

// створюєм обєкт стейту
const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,

  // Додаємо обробку зовнішніх екшенів
  extraReducers: {
    //fetchContacts
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    //addContacts
    [addContacts.pending](state) {
      state.isLoading = true;
    },
    [addContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.items.push(action.payload);
      state.error = null;
    },
    [addContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    //deleteContacts
    [deleteContacts.pending](state) {
      state.isLoading = true;
    },
    [deleteContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;