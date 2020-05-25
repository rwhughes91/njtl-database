import React from 'react';
import classes from './Layout.module.css';
import withSizes from 'react-sizes';

const Layout = (props) => {
  let output = props.desktopPages;
  if (props.isMobile) {
    output = props.mobilePages;
  }

  return <main className={classes.Main}>{output}</main>;
};

const mapSizesToProps = ({ width }) => {
  return {
    isMobile: width <= 640,
  };
};

export default withSizes(mapSizesToProps)(React.memo(Layout));
