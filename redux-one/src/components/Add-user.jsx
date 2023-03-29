import { useDispatch } from 'react-redux';
import { addUser } from '../redux/store';

// Компонент добавления пользователя
const AddUserForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      id: Date.now(),
      name: event.target.name.value,
      email: event.target.email.value
    };

    dispatch(addUser(newUser));

    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Имя" required />
      <input type="email" name="email" placeholder="Email" required />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddUserForm
