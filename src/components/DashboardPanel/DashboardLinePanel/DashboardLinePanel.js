import React from 'react';
import { Line } from 'react-chartjs-2';
import { colors } from '../config';

const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });

const DashboardLinePanel = ({ lineData1, lineData2, labels }) => {
  const dataset = {
    labels,
    datasets: [
      {
        label: 'Monthly Redemptions',
        fill: false,
        borderColor: colors.green,
        pointBorderColor: colors.green,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1.5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.gray,
        pointHoverBorderColor: colors.green,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 1,
        data: lineData1,
      },
      {
        label: 'Monthly Subs Paid',
        fill: false,
        borderColor: colors.purple,
        pointBorderColor: colors.purple,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1.5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.gray,
        pointHoverBorderColor: colors.purple,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 1,
        data: lineData2,
      },
    ],
  };
  return (
    <Line
      data={dataset}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                min: 0,
                callback: (label, index, labels) =>
                  `$${numberFormat.format(label)}`,
              },
            },
          ],
        },
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
        tooltips: {
          callbacks: {
            label: (item) =>
              `${item.xLabel}: $${numberFormat.format(item.yLabel.toFixed())}`,
          },
        },
      }}
    />
  );
};

export default React.memo(DashboardLinePanel);
