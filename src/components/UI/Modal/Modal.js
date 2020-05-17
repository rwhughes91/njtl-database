import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  const classNames = [classes.Modal];
  if (props.show) {
    classNames.push(classes.ModalShow);
  } else {
    classNames.push(classes.ModalHide);
  }
  return (
    <>
      <Backdrop show={props.show} hide={props.hide} />
      <div className={classNames.join(' ')}>{props.children}</div>
    </>
  );
};

export default Modal;
