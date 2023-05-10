export const getContacts = state => state.contacts.items;

export const getIsLoading = state => state.contacts.isLoading;

export const getError = state => state.contacts.null;

export const filterField = state => state.filter;

export const getVisibleContacts = state => {
  const allContacts = getContacts(state);
  const filter = filterField(state);

  return allContacts.filter(({ name }) => name.includes(filter));
};
