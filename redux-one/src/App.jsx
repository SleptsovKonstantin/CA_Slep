import './App.css';
import AddUserForm from './components/Add-user';
import UserList from './components/User-list';

const App = () => {
  return (
    <div className="App">
      <AddUserForm />
      <UserList />
    </div>
  );
}

export default App;
