import { useDispatch, useSelector } from 'react-redux';
import css from './ContactList.module.css';
import { getVisibleContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';

export default function ContactList() {
  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  const handleDeleteContact = e => dispatch(deleteContact(e.target.id));
  console.log('contacts', contacts);
  return (
    <>
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

  // // при видаленні контакта викликаєм dispatch
  // const onDeleteContact = e => {
  //   // dispatch(deleteContact(e.target.id));
  //   Notiflix.Notify.success(`Сontact deleted successfully`);
  // };

  // return (
  //   <>
  //     {visibleContacts.length === 0 ? (
  //       <div>Empty</div>
  //     ) : (
  //       <ul>
  //         {visibleContacts.map(({ name, id, number }) => (
  //           <li key={id}>
  //             <span className={css.name}> {name}:</span>
  //             <span className={css.number}>{number}</span>
  // <button type="button" id={id} onClick={onDeleteContact}>
  //   Delete
  // </button>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </>
  // );
}
