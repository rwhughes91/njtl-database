import React from 'react';
import classes from './DashboardSummaryPanel.module.css';
import Dollar from '../../UI/Icons/Dollar/Dollar';
import Number from '../../UI/Icons/Number/Number';

const DashboardSummaryPanel = ({
  summaryData,
  title,
  iconType,
  color,
  backgroundColor,
}) => {
  let icon = <Dollar color={color} backgroundColor={backgroundColor} />;
  if (iconType === 'number') {
    icon = <Number color={color} backgroundColor={backgroundColor} />;
  }
  return (
    <div className={classes.DashboardSummaryPanel}>
      <div className={classes.Icon}>{icon}</div>
      <div>
        <h1 className={classes.Data}>{summaryData}</h1>
        <p className={classes.SubTitle}>{title}</p>
      </div>
    </div>
  );
};

export default React.memo(DashboardSummaryPanel);
