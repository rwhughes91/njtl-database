import React from 'react';
import { Bar } from 'react-chartjs-2';
import { colors, backgroundColors } from '../config';

const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });

const DashboardBarPanel = ({ data, labels }) => {
  const dataset = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors.purple,
        barPercentage: 0.55,
        borderWidth: 1,
        borderColor: colors.purple,
        hoverBackgroundColor: colors.purple,
      },
    ],
  };
  return (
    <Bar
      data={dataset}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        legend: false,
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
                callback: (label, index, labels) => numberFormat.format(label),
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: (item) =>
              `${item.xLabel}: ${numberFormat.format(item.yLabel)}`,
          },
        },
      }}
    />
  );
};

export default React.memo(DashboardBarPanel);
