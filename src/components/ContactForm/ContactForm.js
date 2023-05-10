import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import css from './ContactForm.module.css';
import Notiflix from 'notiflix';
import { getContacts } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/operations';
// import { addContacts } from 'reduxCopy/contactsSlice';

// initial значення для бібліотеки formik
const initialValues = {
  name: '',
  number: '',
};

// Валідація імені та номера телефона
let userSchema = object().shape({
  name: string().min(2).required(),
  number: string()
    .min(10, '10 number not with space: 067 954 310')
    .matches(
      /^((\(\d{3}\)?)|(\d{3}))?\d{3}\d{4}$/,
      '10 number not with space: 067 954 310'
    )
    .required(),
});

export default function ContactForm() {
  // отримуємо список контактів щоб знайти чи при submit в нас не повторюється імя в списку
  const contactsRedux = useSelector(getContacts);

  const dispatch = useDispatch();

  const handleSubmit = ({ name, number }, action) => {
    //якщо імя повторюється випливає попередження
    if (contactsRedux.find(contact => contact.name === name) !== undefined) {
      Notiflix.Notify.failure(`${name} already in your contact book`);
      return;
    }
    const contact = { name, phone: number };
    // якщо не повторюється додаємо новий контакт
    dispatch(addContacts(contact));
    Notiflix.Notify.success(`You added ${name} to phonebook`);
    //скидання полів форми
    action.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={userSchema}
    >
      <Form autoComplete="off">
        <label>
          <p>Name</p>
          <Field type="text" name="name" />
          <ErrorMessage component="p" className={css.nameError} name="name" />
        </label>

        <label>
          <p>Phone</p>
          <Field type="tel" name="number" />
          <ErrorMessage
            component="p"
            className={css.phoneError}
            name="number"
          />
        </label>
        <br></br>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
