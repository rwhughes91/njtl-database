import React from 'react';
import classes from './DashboardPanel.module.css';
import DashboardSummaryPanel from './DashboardSummaryPanel/DashboardSummaryPanel';
import DashboardPiePanel from './DashboardPiePanel/DashboardPiePanel.js';
import DashboardBarPanel from './DashboardBarPanel/DashboardBarPanel';
import DashboardHBarPanel from './DashboardBarPanel/DashboardHBarPanel';
import DashboardCashFlowPanel from './DashboardCashFlowPanel/DashboardCashFlowPanel';
import DashboardLinePanel from './DashboardLinePanel/DashboardLinePanel';

const DashboardPanel = ({
  type,
  summaryData,
  title,
  iconType,
  color,
  backgroundColor,
  data,
  labels,
  lineData1,
  lineData2,
  lineData3,
}) => {
  const classNames = [classes.DashboardPanel];
  let output = <div>test</div>;
  switch (type) {
    case 'summary':
      output = (
        <DashboardSummaryPanel
          summaryData={summaryData}
          title={title}
          iconType={iconType}
          color={color}
          backgroundColor={backgroundColor}
        />
      );
      break;
    case 'monthlyRedemptionsAndSubs':
      classNames.push(classes.DashboardPanelLarge);
      output = (
        <div className={classes.DashboardContainer}>
          <h1 className={classes.DashboardPanelTitle}>{title}</h1>
          <DashboardLinePanel
            lineData1={lineData1}
            lineData2={lineData2}
            lineData3={lineData3}
            labels={labels}
          />
        </div>
      );
      break;
    case 'lienType':
      classNames.push(classes.DashboardPanelMedium);
      output = (
        <div className={classes.DashboardContainer}>
          <h1 className={classes.DashboardPanelTitle}>{title}</h1>
          <DashboardHBarPanel data={data} labels={labels} />
        </div>
      );
      break;
    case 'lienStatus':
      classNames.push(classes.DashboardPanelMedium);
      output = (
        <div className={classes.DashboardContainer}>
          <h1 className={classes.DashboardPanelTitle}>{title}</h1>
          <DashboardPiePanel data={data} labels={labels} />
        </div>
      );
      break;
    case 'cashFlowByMonth':
      classNames.push(classes.DashboardPanelLarge);
      output = (
        <div className={classes.DashboardContainer}>
          <h1 className={classes.DashboardPanelTitle}>{title}</h1>
          <DashboardCashFlowPanel
            lineData1={lineData1}
            lineData2={lineData2}
            labels={labels}
          />
        </div>
      );
      break;
    case 'lienYear':
      classNames.push(classes.DashboardPanelMedium);
      output = (
        <div className={classes.DashboardContainer}>
          <h1 className={classes.DashboardPanelTitle}>{title}</h1>
          <DashboardBarPanel data={data} labels={labels} />
        </div>
      );
      break;
    default:
  }
  return <div className={classNames.join(' ')}>{output}</div>;
};
export default React.memo(DashboardPanel);
