// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import css from './ContactList.module.css';
import {
  useGetContactsQuery,
  useDeleteContactsMutation,
} from 'redux/contactsApi';
import { selectFilterField } from 'redux/selectors';
import Notiflix from 'notiflix';

export default function ContactList() {
  const { data: contacts, isLoading } = useGetContactsQuery();
  const [func] = useDeleteContactsMutation();

  // беремо значення поля find contacts
  const filterValue = useSelector(selectFilterField);

  // фільтруємо масив якщо було змінено значення поля find contacts
  const filteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );

  return (
    <>
      {/* якщо виконується дія, показуємо Loading над нашим списком контактів */}
      {isLoading ? <div>Loading...</div> : ''}
      <ul>
        {!isLoading &&
          filteredContacts().map(({ name, phone, id }) => (
            <li key={id}>
              <span className={css.name}> {name}:</span>
              <span className={css.number}>{phone}</span>
              <button
                type="button"
                id={id}
                onClick={() => {
                  Notiflix.Notify.success(`You delete contact`);
                  func(id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
