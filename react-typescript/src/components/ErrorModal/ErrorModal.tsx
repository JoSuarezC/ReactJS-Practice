import React from 'react';
import classes from './ErrorModal.module.css';
import Button from '../UI/Button';
import { Card } from '../UI/Card';
import ReactDOM from 'react-dom';

type Props = {
  title: string;
  content: string;
  toggleModal: () => void;
};

const ErrorModal: React.FC<Props> = ({ toggleModal, title, content }) => {
  const ModalComp = (
    <>
      <div
        className={classes.backdrop}
        onClick={toggleModal}
      ></div>
      <Card className={classes.modal}>
        <div className={classes.header}>
          <h1>{title}</h1>
        </div>
        <p className={classes.content}>{content}</p>
        <div className={classes.actions}>
          <Button
            type='button'
            onClick={toggleModal}
            label='Okay'
          />
        </div>
      </Card>
    </>
  );
  
  return (
    <>
      {ReactDOM.createPortal(
        ModalComp,
        document.getElementById('modal-overlay') as Element
      )}
    </>
  );
};
export default ErrorModal;
