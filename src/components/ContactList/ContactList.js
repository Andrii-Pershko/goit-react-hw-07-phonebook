import { useSelector } from 'react-redux';
import css from './ContactList.module.css';
import { deleteContact } from 'redux/contactsSlice';
import { useDispatch } from 'react-redux';
import Notiflix from 'notiflix';

export default function ContactList() {
  // отримуємо список контактів
  const contactsRedux = useSelector(state => state.contacts);
  // отримуємо стейт фільтру
  const filterRedux = useSelector(state => state.filters);

  const dispatch = useDispatch();
  // при видаленні контакта викликаєм dispatch
  const onDeleteContact = e => {
    dispatch(deleteContact(e.target.id));
    Notiflix.Notify.success(`Сontact deleted successfully`);
  };
  // фільтруєм контакти
  const visibleContacts = filterRedux
    ? contactsRedux.filter(contact => contact.name.includes(filterRedux))
    : contactsRedux;

  return (
    <>
      {visibleContacts.length === 0 ? (
        <div>Empty</div>
      ) : (
        <ul>
          {visibleContacts.map(({ name, id, number }) => (
            <li key={id}>
              <span className={css.name}> {name}:</span>
              <span className={css.number}>{number}</span>
              <button type="button" id={id} onClick={onDeleteContact}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
