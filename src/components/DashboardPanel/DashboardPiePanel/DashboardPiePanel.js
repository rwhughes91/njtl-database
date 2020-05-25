import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { colors, backgroundColors } from '../config';

const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });

const mapToStatus = {
  Open: 'gray',
  Bankruptcy: 'red',
  'Bankruptcy/redeemed': 'blue',
  Foreclosure: 'purple',
  'Foreclosure/redeemed': 'orange',
  'No-subs': 'yellow',
  Own: 'green',
  Redeemed: 'lightBlue',
};

const DashboardLienTypePanel = ({ data, labels }) => {
  const borderColorsArray = [];
  const backgroundColorsArray = [];
  for (let label of labels) {
    borderColorsArray.push(colors[mapToStatus[label]]);
    backgroundColorsArray.push(backgroundColors[mapToStatus[label]]);
  }
  const dataset = {
    labels,
    datasets: [
      {
        data,
        borderWidth: 0.5,
        borderColor: borderColorsArray,
        backgroundColor: backgroundColorsArray,
        hoverBackgroundColor: borderColorsArray,
      },
    ],
  };
  return (
    <Doughnut
      data={dataset}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
          },
        },
        tooltips: {
          callbacks: {
            label: (item, data) => {
              const label = data.labels[item.index];
              const value = data.datasets[0].data[item.index];
              const totalLiens = data.datasets[0].data.reduce(
                (accumulator, currentValue) => accumulator + currentValue
              );
              return `${label}: ${numberFormat.format(value)} (${(
                (value / totalLiens) *
                100
              ).toFixed()}%)`;
            },
          },
        },
      }}
    />
  );
};

export default React.memo(DashboardLienTypePanel);
