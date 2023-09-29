import React, { useState } from 'react';
import './App.css';
import AddUser from './components/AddUser/AddUser';
import { UserList } from './components/UserList/UserList';

export type User = {
  id: string;
  username: string;
  age: string;
};

function App() {
  const [userList, setUserList] = useState<User[]>([]);

  function onUserAdded(username: string, age: string) {
    setUserList([
      ...userList,
      {
        id: Math.random().toString(),
        username,
        age: age,
      },
    ]);
  }

  return (
    <>
      <AddUser onSubmit={onUserAdded} />
      <UserList users={userList} />
    </>
  );
}

export default App;
