import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = ({ onClose }) => (
  <div
    className={classes.backdrop}
    onClick={onClose}
  ></div>
);

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};
const Modal = ({ children, onClose }) => {
  const portal = document.getElementById('modal-overlay');

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portal)}
      {ReactDOM.createPortal(<ModalOverlay> {children} </ModalOverlay>, portal)}
    </>
  );
};

export default Modal;
