class DetailedExpenses {
    constructor() {
        this.expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        this.initializeDetailedChart();
        this.renderExpenseList();
    }

    initializeDetailedChart() {
        const ctx = document.getElementById('detailedChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.getLast30Days(),
                datasets: [{
                    label: 'Daily Expenses',
                    data: this.getMonthlyTotals(),
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

    renderExpenseList() {
        const container = document.getElementById('expenseItems');
        container.innerHTML = this.expenses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(exp => `
        <div class="border-b py-2 flex justify-between">
          <div>${exp.description}</div>
          <div>$${exp.amount.toFixed(2)} - ${new Date(exp.date).toLocaleDateString()}</div>
        </div>
      `).join('');
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

new DetailedExpenses();