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
  if (props.type === 'error') {
    classNames.push(classes.Error);
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
          <button className={classes.Close}>&times;</button>
        </div>
      )}
    </CSSTransition>
  );
};

export default FlashMessage;
