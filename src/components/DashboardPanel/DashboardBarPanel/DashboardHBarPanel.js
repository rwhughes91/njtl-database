import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { colors, backgroundColors } from '../config';

const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });

const DashboardHorizontalBarPanel = ({ data, labels }) => {
  const dataset = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors.lightBlue,
        borderWidth: 1,
        borderColor: colors.lightBlue,
        hoverBackgroundColor: colors.lightBlue,
      },
    ],
  };
  return (
    <HorizontalBar
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
              `${item.yLabel}: ${numberFormat.format(item.xLabel)}`,
          },
        },
      }}
    />
  );
};

export default React.memo(DashboardHorizontalBarPanel);
