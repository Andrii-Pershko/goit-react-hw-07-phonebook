import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter } from 'redux/filterSlice';
import { selectContacts, selectIsLoading } from 'redux/selectors';

export default function Filter() {
  const dispatch = useDispatch();
  //дізнаємось довжину масиву для того щоб знати чи рендерити компонент
  const contacts = useSelector(selectContacts).length;
  const isLoading = useSelector(selectIsLoading);

  //змінюємо setStatusFilter в залежності від значення
  const handleFilterChange = e => {
    dispatch(setStatusFilter(e.target.value));
  };

  if (isLoading) {
    return;
  }
  return (
    <>
      {/* якщо масив контактів порожній виводимо надпис про це, інакше показуємо фільтр*/}
      {contacts > 0 ? (
        <div>
          <p>Find contacts by name</p>
          <input type="text" name="filter" onChange={handleFilterChange} />
        </div>
      ) : (
        <p>the phone book is empty</p>
      )}
    </>
  );
}
