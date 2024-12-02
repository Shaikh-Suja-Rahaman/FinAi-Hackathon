import Chart from 'chart.js/auto';

// Import Chart.js
// Ensure the HTML file has a div with an id of 'chartContainer'
document.addEventListener('DOMContentLoaded', function () {
    const chartContainer = document.getElementById('chartContainer');
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    chartContainer.appendChild(canvas);
});

// Sample data for daily spendings
const dailySpendings = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [{
        label: 'Daily Spendings',
        data: [50, 75, 100, 125, 150, 175, 200],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0)',
        fill: true,
        tension: 0.1
    }]
};

// Configuration options
const config = {
    type: 'line',
    data: dailySpendings,
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days of the Week'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Spendings ($)'
                },
                beginAtZero: true
            }
        }
    }
};

// Render the chart
window.onload = function () {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, config);
};