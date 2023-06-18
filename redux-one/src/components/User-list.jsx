import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../redux/store';

const UserList = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleRemove = (userId) => {
    dispatch(removeUser(userId));
  };

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} ({user.email}){' '}
          <button onClick={() => handleRemove(user.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList