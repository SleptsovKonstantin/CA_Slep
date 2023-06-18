import { useDispatch } from 'react-redux';
import { addItem } from '../redux/store';

const Income = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: Date.now(),
      item: event.target.item.value,
      sum: Number(event.target.sum.value),
    };

    dispatch(addItem(newItem));

    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Доходы</h1>
      <input type="text" name="item" placeholder="Статья дохода" required />
      <input type="text" name="sum" placeholder="Сумма" required />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default Income
