import React from 'react';
import { Bar } from 'react-chartjs-2';
import { colors, backgroundColors } from '../config';

const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });

const DashboardLinePanel = ({ lineData1, lineData2, labels }) => {
  const dataset = {
    labels,
    datasets: [
      {
        label: 'Total Cash Out',
        data: lineData2,
        backgroundColor: backgroundColors.red,
        hoverBackgroundColor: colors.red,
        borderWidth: 1,
        borderColor: colors.red,
      },
      {
        label: 'Total Cash In',
        data: lineData1,
        borderWidth: 1,
        borderColor: colors.green,
        backgroundColor: backgroundColors.green,
        hoverBackgroundColor: colors.green,
      },
    ],
  };
  return (
    <Bar
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
              `${item.xLabel} $${numberFormat.format(item.yLabel.toFixed())}`,
          },
        },
      }}
    />
  );
};

export default React.memo(DashboardLinePanel);
