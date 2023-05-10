import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { addContacts, deleteContacts, fetchContacts } from './operations';
import {
  handleAddContacts,
  handleDeleteContact,
  handleFetchContacts,
  handlePending,
  handleRej,
  processingOperations,
} from './builderFn';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFetchContacts)
      .addCase(addContacts.fulfilled, handleAddContacts)
      .addCase(deleteContacts.fulfilled, handleDeleteContact)
      .addMatcher(isAnyOf(...processingOperations('pending')), handlePending)
      .addMatcher(isAnyOf(...processingOperations('rejected')), handleRej);
  },
});

export const contactsReducer = contactsSlice.reducer;
