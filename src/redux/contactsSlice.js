import { createSlice, isAnyOf } from '@reduxjs/toolkit';
// Імпортуємо операцію
import { addContacts, deleteContacts, fetchContacts } from './operations';

// створюєм обєкт стейту
const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsFunctionsArr = [addContacts, deleteContacts, fetchContacts];

const processingOperations = type => contactsFunctionsArr.map(fn => fn[type]);

const handlePending = state => {
  state.isLoading = true;
};
const handleRej = (state, action) => {
  console.log('state', state);
  console.log('action', action);

  // тут вибиває помилку що в action нічого не приходить
  // state.isLoading = false;
  // state.error = action.payload;
};

const handleFetchContacts = (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
  state.error = null;
};

const handleDeleteContact = (state, action) => {
  state.isLoading = false;
  state.error = null;
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.items.splice(index, 1);
};

const handleAddContacts = (state, action) => {
  state.isLoading = false;
  state.items.push(action.payload);
  state.error = null;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,

  // Додаємо обробку зовнішніх екшенів
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFetchContacts)
      .addCase(addContacts.fulfilled, handleAddContacts)
      .addCase(deleteContacts.fulfilled, handleDeleteContact)
      .addMatcher(isAnyOf(...processingOperations('pending'), handlePending))
      // коли комітчу нижній рядок все працює але якщо повертається rejected з серверу взагалі все падає
      .addMatcher(isAnyOf(...processingOperations('rejected'), handleRej));

    //fetchContacts
    // [fetchContacts.pending](state) {
    //   state.isLoading = true;
    // },
    // [fetchContacts.fulfilled](state, action) {
    //   state.isLoading = false;
    //   state.items = action.payload;
    //   state.error = null;
    // },
    // [fetchContacts.rejected](state, action) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    //addContacts
    // [addContacts.pending](state) {
    //   state.isLoading = true;
    // },
    // [addContacts.fulfilled](state, action) {
    //   state.isLoading = false;
    //   state.items.push(action.payload);
    //   state.error = null;
    // },
    // [addContacts.rejected](state, action) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // //deleteContacts
    // [deleteContacts.pending](state) {
    //   state.isLoading = true;
    // },
    // [deleteContacts.fulfilled](state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   const index = state.items.findIndex(
    //     contact => contact.id === action.payload.id
    //   );
    //   state.items.splice(index, 1);
    // },
    // [deleteContacts.rejected](state, action) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const contactsReducer = contactsSlice.reducer;
