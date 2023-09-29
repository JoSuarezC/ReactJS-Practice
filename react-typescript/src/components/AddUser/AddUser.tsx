import React, { useState } from 'react';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../ErrorModal/ErrorModal';
import { Card } from '../UI/Card';

type Props = {
  onSubmit: (username: string, age: string) => void;
};

type FormValues = {
  username: { value: string };
  age: { value: string };
};

type ModalData = {
  title: string;
  content: string;
};

const AddUser: React.FC<Props> = ({ onSubmit }) => {
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  function toggleModal() {
    setIsModalShown((prev) => !prev);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formValues = event.target as typeof event.target & FormValues;

    const username = formValues.username.value;
    const age = formValues.age.value;

    if (age.trim().length === 0 || username.trim().length === 0) {
      setModalData({
        title: 'Invalid Input',
        content: 'Please enter valid values',
      });
      toggleModal();
      return;
    }

    if (+age > 0) {
      setModalData({
        title: 'Invalid Input',
        content: 'Please enter a valid age',
      });
      toggleModal();
      return;
    }

    onSubmit(username, age);
  }

  return (
    <Card className={classes.input}>
      {isModalShown && (
        <ErrorModal
          title={modalData?.title ?? 'An error occurred'}
          content={modalData?.content ?? 'Something went wrong'}
          toggleModal={toggleModal}
        />
      )}
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type='text'
          id='username'
          name='username'
        />

        <label>Age (Years)</label>
        <input
          type='number'
          id='age'
          name='age'
        />

        <Button
          type='submit'
          label='Add User'
        />
      </form>
    </Card>
  );
};

export default AddUser;
