import { useDispatch } from 'react-redux';
import { setStatusFilter } from 'redux/filterSlice';

export default function Filter() {
  const dispatch = useDispatch();
  // при вводі в поле фільтра викликаєм dispatch
  const handleFilterChange = e => {
    dispatch(setStatusFilter(e.target.value));
  };

  return (
    <>
      <p>Find contacts by name</p>
      <input type="text" name="filter" onChange={handleFilterChange} />
    </>
  );
}
