import { useDispatch } from 'react-redux';
import { useGetContactsQuery } from 'redux/contactsApi';
import { setStatusFilter } from 'redux/filterSlice';

export default function Filter() {
  const dispatch = useDispatch();
  const { data: contacts, isLoading } = useGetContactsQuery();

  //змінюємо setStatusFilter в залежності від значення
  const handleFilterChange = e => {
    dispatch(setStatusFilter(e.target.value));
  };

  if (!isLoading && contacts.length === 0) {
    return <p>the phone book is empty</p>;
  }

  return (
    <>
      {isLoading ? (
        <p>the phone book is empty</p>
      ) : (
        <div>
          <p>Find contacts by name</p>
          <input type="text" name="filter" onChange={handleFilterChange} />
        </div>
      )}
    </>
  );
}
