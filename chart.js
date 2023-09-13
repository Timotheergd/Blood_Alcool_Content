// import {Chart} from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';


// Function to update the chart
function updateChart() {
    const container = document.querySelector('.container');
    container.innerHTML = '<canvas id="bacChart"></canvas>';
  
    const bacData = calculateBAC();
    const ctx = document.getElementById('bacChart').getContext('2d');
  
    // Create a line chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: bacData.labels,
        datasets: [
          {
            label: 'BAC',
            data: bacData.bacData,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            datalabels: {
                // labels: {
                    color: '#0000FF',
                    fillStyle: "#fff"
                // }
            }
          },
          {
            label: 'Legal Limit',
            data: Array(bacData.labels.length).fill(legalLimit),
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1,
            borderDash: [5, 5],
            type: 'line',
            datalabels: {
                labels: {
                    usePointStyle: true,
                  title: {
                    color: 'green'
                  }
                }
              }
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'BAC (g/L)',
              color: "#ddd",
            },
            ticks: {
                color: "#ddd",
            },
            grid: {
                color: '#444'
            }
          
          },
          x: {
            title: {
              display: true,
              text: 'Time (hours)',
              color: "#ddd",
            },
            ticks: {
                color: "#ddd",
            },
            grid: {
                color: '#444'
            }
          }
        },
        legend: {
            
            labels: {
               fontColor: '#00f',
               usePointStyle: true,
            }
         },
         plugins: {
            datalabels: {
                display: false,
                labels: {
                    usePointStyle: true,
                    title: {
                      color: '#11f',
                    },
                color: '#0000FF'
            },
            legend: {
                usePointStyle: true,
                labels: {
                   fontColor: '#00f'
                }
             },
        },
        
        }
      },
      plugins: {
        datalabels: {
            display: false,
            labels: {
                usePointStyle: true,
                title: {
                  color: '#11f',
                },
            color: '#00f',
            style: {
                color: '#00f'
            }

        },
        legend: {
            usePointStyle: true,
            labels: {
               fontColor: '#00f'
            }
         },
    },
    
    }
    });
  }
  