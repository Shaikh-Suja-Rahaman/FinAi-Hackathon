class DetailedExpenses {
    constructor() {
        this.username = localStorage.getItem('currentUsername');
        this.expenses = [];
        this.initializeDetailedChart();
        this.renderExpenseList();
        this.fetchExpenses();
    }

    async fetchExpenses() {
        if (!this.username) {
            console.error('Username not found in localStorage.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/expenses/${this.username}`);
            const data = await response.json();
            if (response.ok) {
                this.expenses = data.expenses;
                this.renderExpenseList();
                this.updateDetailedChart();
                this.renderTodaysTransactions();
            } else {
                console.error('Error fetching expenses:', data.error);
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }

    renderExpenseList() {
        const container = document.getElementById('expenseItems');
        if (!container) {
            console.error('Expense items container not found.');
            return;
        }

        if (this.expenses.length === 0) {
            container.innerHTML = '<p>No expenses found.</p>';
            return;
        }

        container.innerHTML = this.expenses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(exp => `
                <div class="border-b py-2 flex justify-between">
                    <div>${exp.description}</div>
                    <div>$${exp.amount.toFixed(2)} - ${new Date(exp.date).toLocaleDateString()}</div>
                </div>
            `).join('');
    }

    renderTodaysTransactions() {
        const container = document.getElementById('todaysTransactions');
        if (!container) {
            console.error('Todays transactions container not found.');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        const todaysExpenses = this.expenses.filter(exp => exp.date.startsWith(today));

        if (todaysExpenses.length === 0) {
            container.innerHTML = '<p>No transactions for today.</p>';
            return;
        }

        container.innerHTML = todaysExpenses
            .map(exp => `
                <div class="transaction">
                    <div>${exp.description}</div>
                    <div>$${exp.amount.toFixed(2)}</div>
                </div>
            `).join('');
    }

    initializeDetailedChart() {
        const ctx = document.getElementById('detailedChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.getLast30Days(),
                datasets: [{
                    label: 'Daily Expenses',
                    data: [], // Will be populated after fetching expenses
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateDetailedChart() {
        const dailyTotals = this.getMonthlyTotals();
        this.chart.data.datasets[0].data = dailyTotals;
        this.chart.update();
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DetailedExpenses();
});