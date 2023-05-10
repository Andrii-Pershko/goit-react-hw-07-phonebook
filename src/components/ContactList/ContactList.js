import { useDispatch, useSelector } from 'react-redux';
import css from './ContactList.module.css';
import { selectIsLoading, selectVisibleContacts } from 'redux/selectors';
import { deleteContacts, fetchContacts } from 'redux/operations';
import { useEffect } from 'react';

export default function ContactList() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const contacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // при видалені контакту передаємо в deleteContacts id нашої кнопки який співпадає з id елемента
  const handleDeleteContact = e => dispatch(deleteContacts(e.target.id));

  return (
    <>
      {/* якщо виконується дія, показуємо Loading над нашим списком контактів */}
      {isLoading ? <div>Loading...</div> : ''}
      <ul>
        {contacts.map(({ name, phone, id }) => (
          <li key={id}>
            <span className={css.name}> {name}:</span>
            <span className={css.number}>{phone}</span>

            <button type="button" id={id} onClick={handleDeleteContact}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
