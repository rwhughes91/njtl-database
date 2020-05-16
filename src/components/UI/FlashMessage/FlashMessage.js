import React, { useState, useEffect } from 'react';
import classes from './FlashMessage.module.css';
import { CSSTransition } from 'react-transition-group';

export const FlashMessageContainer = (props) => {
  let style = { top: props.top, right: props.right, width: props.width };
  if (props.center) {
    style = {
      right: '50%',
      transform: 'translateX(50%)',
    };
  }
  return (
    <div className={classes.FlashMessageContainer} style={style}>
      {props.children}
    </div>
  );
};

const FlashMessage = (props) => {
  const [showFlash, setShowFlash] = useState(false);
  useEffect(() => {
    const timerShow = setTimeout(() => setShowFlash(true), 250);
    const timerFade = setTimeout(() => setShowFlash(false), 5000);
    return () => {
      clearTimeout(timerShow);
      clearTimeout(timerFade);
    };
  }, []);

  const onClickHandler = () => {
    setShowFlash(false);
  };

  const classNames = [classes.FlashMessage];
  const buttonClassNames = [classes.Close];
  if (props.type === 'error') {
    classNames.push(classes.Error);
    buttonClassNames.push(classes.CloseError);
  } else if (props.type === 'success') {
    classNames.push(classes.Success);
    buttonClassNames.push(classes.CloseSuccess);
  } else if (props.type === 'info') {
    classNames.push(classes.Info);
    buttonClassNames.push(classes.InfoClose);
  }

  return (
    <CSSTransition
      in={showFlash}
      timeout={300}
      unmountOnExit
      mountOnEnter
      classNames={{
        enter: classes.Enter,
        enterActive: classes.EnterActive,
        exit: classes.Exit,
        exitActive: classes.ExitActive,
      }}
    >
      {() => (
        <div className={classNames.join(' ')} onClick={onClickHandler}>
          <p>{props.message}</p>
        </div>
      )}
    </CSSTransition>
  );
};

export default FlashMessage;
