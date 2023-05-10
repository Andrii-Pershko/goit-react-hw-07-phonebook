import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: ['Contacts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://645a9ce195624ceb21071450.mockapi.io',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),
    deleteContacts: builder.mutation({
      query: contactId => ({
        method: 'delete',
        url: `/contacts/${contactId}`,
      }),
      invalidatesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: contact => ({
        method: 'POST',
        url: `/contacts`,
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactsMutation,
  useAddContactMutation,
} = contactsApi;
