// import {Chart} from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// Function to update the chart
function updateChart() {
  const container = document.querySelector('.container');
  container.innerHTML = '<canvas id="bacChart"></canvas>';

  const bacData = calculateBAC();
  const ctx = document.getElementById('bacChart').getContext('2d');

  // Build confidence interval: resets on rises, moves with center on falls, clamps at zero
  const upperLimitData = [];
  const lowerLimitData = [];
  let upper = 0, lower = 0, diff = 0;
  let tensionValue = 0.3;

  bacData.bacData.forEach((v, i) => {
    if (i === 0) {
      upper = v * 1.21;
      lower = v * 0.79;
    } else {
      const prev = bacData.bacData[i - 1];
      if (v > 0) {
        diff = v - prev; //to continue to go down for the upper limit after center hit 0
      }
      if (v > prev) {
        // reset to ±21% on rise
        upper = upper + diff * 1.21;
        lower = lower + diff * 0.79;
      } else {
        // shrink/grow interval with center on falls
        upper += diff*0.875;
        lower += diff*1.125;
      }
    }

    // ensure lower bound never drops below zero
    lower = Math.max(lower, 0);
    // ensure upper bound never drops below zero
    upper = Math.max(upper, 0);

    upperLimitData.push(upper);
    lowerLimitData.push(lower);
  });

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bacData.labels,
      datasets: [
        {
          label: 'BAC',
          data: bacData.bacData,
          tension: tensionValue,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          backgroundColor: 'transparent',
          pointRadius: 3,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        },
        {
          label: 'Confidence Interval',
          data: upperLimitData,
          tension: tensionValue,
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          borderDash: [4, 4],
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          fill: { target: 0, above: 'rgba(255, 165, 0, 0.2)' }
        },
        {
          // lower CI, hidden in legend
          label: 'Confidence Interval',
          data: lowerLimitData,
          tension: tensionValue,
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          borderDash: [4, 4],
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          fill: { target: 0, below: 'rgba(255, 165, 0, 0.2)' }
        },
        {
          label: 'Legal Limit',
          data: Array(bacData.labels.length).fill(legalLimit),
          tension: tensionValue,
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          borderDash: [5, 5],
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'BAC (g/L)', color: '#ccc' },
          ticks: { color: '#ccc' },
          grid: { color: '#444' }
        },
        x: {
          title: { display: true, text: 'Time (hours)', color: '#ccc' },
          ticks: { color: '#ccc' },
          grid: { color: '#444' }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#ccc',
            usePointStyle: true,
            // only show one CI entry
            filter: (legendItem, data) => {
              const idx = legendItem.datasetIndex;
              return !(data.datasets[idx].label === 'Confidence Interval' && idx === 2);
            }
          },
          onClick: function(e, legendItem) {
            const ciLabel = legendItem.text;
            const ciDatasets = this.chart.data.datasets
              .map((d, i) => ({d, i}))
              .filter(obj => obj.d.label === ciLabel);
            ciDatasets.forEach(obj => {
              const meta = this.chart.getDatasetMeta(obj.i);
              meta.hidden = meta.hidden === null ? true : !meta.hidden;
            });
            this.chart.update();
          }
        },
        datalabels: { display: false }
      }
    }
  });
}
