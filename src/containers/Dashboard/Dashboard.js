import React, { useEffect, useCallback } from 'react';
import classes from './Dashboard.module.css';
import DashboardPanel from '../../components/DashboardPanel/DashboardPanel';
import useAxios from '../../hooks/useAxios/useAxios';
import Axios from 'axios';
import BadConnection from '../../components/Errors/BadConnection';
import Spinner from '../../components/UI/Spinner/Spinner';
import {
  colors,
  backgroundColors,
} from '../../components/DashboardPanel/config';
import townships from './townships';

const dashboardQuery = `
query fetchDashboardData($county: String) {
  getDashboardData(county: $county) {
    summaryData {
      count
      totalCashOut
      totalCashIn
    }
    typeAggregationData {
      aggByYearStatusType {
        year
        status
        type
        sum
        count
      }
      aggByStatus {
        status
        sum
        count
      }
      aggByType {
        type
        sum
        count
      }
      aggByYear {
        year
        sum
        count
      }
    }
    monthlyRedemptionData {
      redemptionsAndCashFlow {
        date
        count
        redemptionAmount
        totalCashOut
        totalCashIn
      }
      monthlySubData {
        date
        count
        subAmount
      }
    }
  }
}
`;

const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });

const toTitleCase = (str) => {
  if (typeof str !== 'string') {
    return str;
  }
  str = str.toLowerCase().split(' ');
  let newStr = [];
  for (let word of str) {
    newStr.push(word.charAt(0).toUpperCase() + word.slice(1));
  }
  return newStr.join(' ');
};

const Dashboard = () => {
  const [dashboardData, requestDashboardData] = useAxios();

  useEffect(() => {
    const cancelToken = Axios.CancelToken;
    const source = cancelToken.source();
    requestDashboardData(
      {
        query: dashboardQuery,
      },
      'getDashboardData',
      { cancelToken: source.token }
    );
  }, [requestDashboardData]);

  useEffect(() => {
    if (dashboardData.error) {
      window.flash('Could not download the data', 'error');
    }
  });

  let error;
  if (dashboardData.error) {
    error = <BadConnection />;
  }

  const onChangeHandler = useCallback(
    (event) => {
      requestDashboardData(
        {
          query: dashboardQuery,
          variables: { county: event.target.value },
        },
        'getDashboardData'
      );
    },
    [requestDashboardData]
  );

  let dashboardOutput = error || <Spinner />;
  if (dashboardData.data) {
    dashboardOutput = (
      <div className={classes.Dashboard}>
        <div className={classes.DashboardSummaryRow}>
          <DashboardPanel
            type='summary'
            summaryData={
              dashboardData.data
                ? numberFormat.format(dashboardData.data.summaryData.count)
                : 0
            }
            title='Total Liens'
            iconType='number'
            color={colors.blue}
            backgroundColor={backgroundColors.blue}
          />
          <DashboardPanel
            type='summary'
            summaryData={
              dashboardData.data
                ? numberFormat.format(
                    dashboardData.data.typeAggregationData.aggByStatus.find(
                      (item) => item.status === null
                    )
                      ? dashboardData.data.typeAggregationData.aggByStatus.find(
                          (item) => item.status === null
                        ).count
                      : 0
                  )
                : 0
            }
            title='Liens Outstanding'
            iconType='number'
            color={colors.blue}
            backgroundColor={backgroundColors.blue}
          />
          <DashboardPanel
            type='summary'
            summaryData={
              dashboardData.data
                ? Math.round(
                    dashboardData.data.summaryData.totalCashOut
                  ).toLocaleString(0)
                : '$0'
            }
            title='Total Cash Out'
            color={colors.red}
            backgroundColor={'rgba(229, 62, 62, .15)'}
          />
          <DashboardPanel
            type='summary'
            summaryData={
              dashboardData.data
                ? Math.round(
                    dashboardData.data.summaryData.totalCashIn
                  ).toLocaleString(0)
                : '$0'
            }
            title='Total Cash In'
            color={colors.green}
            backgroundColor={'rgba(72,187,120, .15)'}
          />
        </div>
        <div className={classes.DashboardPanelRow}>
          <DashboardPanel
            type='lienType'
            title='Lien by Type'
            data={
              dashboardData.data
                ? dashboardData.data.typeAggregationData.aggByType.map(
                    (item) => item.count
                  )
                : 0
            }
            labels={
              dashboardData.data
                ? dashboardData.data.typeAggregationData.aggByType.map(
                    (item) => {
                      if (item.type === null) {
                        return 'No Type';
                      } else if (item.type === 'Single Family Residential') {
                        return 'SFR';
                      }
                      return item.type;
                    }
                  )
                : null
            }
          />
          <DashboardPanel
            type='lienYear'
            title='Lien by Year'
            data={
              dashboardData.data
                ? dashboardData.data.typeAggregationData.aggByYear.map(
                    (item) => item.count
                  )
                : 0
            }
            labels={
              dashboardData.data
                ? dashboardData.data.typeAggregationData.aggByYear.map(
                    (item) => item.year
                  )
                : null
            }
          />
          <DashboardPanel
            type='lienStatus'
            title='Lien by Status'
            data={
              dashboardData.data
                ? dashboardData.data.typeAggregationData.aggByStatus.map(
                    (item) => item.count
                  )
                : 0
            }
            labels={
              dashboardData.data
                ? dashboardData.data.typeAggregationData.aggByStatus.map(
                    (item) =>
                      item.status === null ? 'Open' : toTitleCase(item.status)
                  )
                : null
            }
          />
        </div>
        <div className={classes.DashboardPanelRow}>
          <DashboardPanel
            type='monthlyRedemptionsAndSubs'
            title='Monthly Redemptions and Sub Payments'
            lineData1={
              dashboardData.data
                ? dashboardData.data.monthlyRedemptionData.redemptionsAndCashFlow.map(
                    (item) => item.redemptionAmount
                  )
                : null
            }
            lineData2={
              dashboardData.data
                ? dashboardData.data.monthlyRedemptionData.monthlySubData.map(
                    (item) => item.subAmount
                  )
                : null
            }
            labels={
              dashboardData.data
                ? dashboardData.data.monthlyRedemptionData.redemptionsAndCashFlow.map(
                    (item) => item.date
                  )
                : null
            }
          />
          <DashboardPanel
            type='cashFlowByMonth'
            title='Cash Flow by Month'
            lineData1={
              dashboardData.data
                ? dashboardData.data.monthlyRedemptionData.redemptionsAndCashFlow.map(
                    (item) => item.totalCashIn
                  )
                : null
            }
            lineData2={
              dashboardData.data
                ? dashboardData.data.monthlyRedemptionData.redemptionsAndCashFlow.map(
                    (item) => item.totalCashOut
                  )
                : null
            }
            labels={
              dashboardData.data
                ? dashboardData.data.monthlyRedemptionData.redemptionsAndCashFlow.map(
                    (item) => item.date
                  )
                : null
            }
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={classes.SelectContainer}>
        <select className={classes.Select} onChange={onChangeHandler}>
          <option value=''>All</option>
          {townships.map((township) => {
            return (
              <option key={township.value} value={township.value}>
                {township.displayValue}
              </option>
            );
          })}
        </select>
      </div>
      {dashboardOutput}
    </>
  );
};

export default React.memo(Dashboard);
