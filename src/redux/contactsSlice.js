import { createSlice, nanoid } from '@reduxjs/toolkit';
import contactsList from 'backEnd_imitation/contacts';

// ініцілюємо стартові контакти
const contactInitialState = [...contactsList];

// створюємо slice для списку контактів
const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  reducers: {
    addContacts: {
      reducer(state, { payload }) {
        state.push(payload);
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact: (state, { payload }) =>
      state.filter(contact => contact.id !== payload),
  },
});

export const { addContacts, deleteContact } = contactSlice.actions;
export const tasksReducer = contactSlice.reducer;
