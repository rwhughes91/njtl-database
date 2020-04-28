import React, { useState, useEffect } from 'react';
import classes from './FlashMessage.module.css';
import { CSSTransition } from 'react-transition-group';

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
          {props.message}
          <button className={buttonClassNames.join(' ')}>&times;</button>
        </div>
      )}
    </CSSTransition>
  );
};

export default FlashMessage;
