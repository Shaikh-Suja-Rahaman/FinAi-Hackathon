class ChartExpenseTracker {
    constructor() {
        this.username = localStorage.getItem('currentUsername');
        this.expenses = [];
        this.initializeChart();    // Initialize chart if canvas exists
        this.loadExpenses();       // Then load expenses
        this.setupEventListeners();
        this.updateUI();
    }

    async loadExpenses() {
        try {
            const response = await fetch(`https://finai-hackathon.onrender.com/expenses/${this.username}`);
            const data = await response.json();
            this.expenses = data.expenses || [];
            this.updateUI();
            this.updateChart();
        } catch (error) {
            console.error('Error loading expenses:', error);
        }
    }

    initializeChart() {
        const chartElement = document.getElementById('detailedChart');
        if (!chartElement) {
            console.error('Detailed Chart Canvas not found.');
            return;
        }

        const ctx = chartElement.getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.getLast30Days(),
                datasets: [{
                    label: 'Daily Expenses (₹)',
                    data: [], // Will be populated after fetching expenses
                    borderColor: '#426b1f',
                    backgroundColor: 'rgba(66, 107, 31, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (₹)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });

        console.log('Chart initialized successfully.');
    }

    updateChart() {
        if (!this.chart) {
            console.error('Chart is not initialized.');
            return;
        }

        const dailyTotals = this.getMonthlyTotals();
        this.chart.data.datasets[0].data = dailyTotals;
        this.chart.update();

        console.log('Chart updated successfully.');
    }

    getLast30Days() {
        return Array.from({ length: 30 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();
    }

    getMonthlyTotals() {
        const days = this.getLast30Days();
        return days.map(day => {
            return this.expenses
                .filter(exp => exp.date.startsWith(day))
                .reduce((sum, exp) => sum + exp.amount, 0);
        });
    }

    setupEventListeners() {
        const form = document.getElementById('expenseForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const amount = document.getElementById('amount').value;
                const description = document.getElementById('description').value;
                const date = document.getElementById('expenseDate').value; // Get the selected date

                const expense = {
                    username: this.username,
                    amount: Number(amount),
                    description: description,
                    date: new Date(date).toISOString() // Convert to ISO format
                };

                try {
                    const response = await fetch('https://finai-hackathon.onrender.com/expenses/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(expense)
                    });

                    const result = await response.json();
                    if (result.result === 'true') {
                        this.loadExpenses(); // Reload expenses from server
                        form.reset();         // Clear the form
                    } else {
                        console.error('Error adding expense:', result.error);
                    }
                } catch (error) {
                    console.error('Error adding expense:', error);
                }
            });
        }
    }

    updateUI() {
        const today = new Date().toISOString().split('T')[0];
        const dailyTotal = this.expenses
            .filter(exp => exp.date.startsWith(today))
            .reduce((sum, exp) => sum + exp.amount, 0);
        const dailyTotalElement = document.getElementById('dailyTotal');
        if (dailyTotalElement) {
            dailyTotalElement.textContent = dailyTotal.toFixed(2);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChartExpenseTracker();
});