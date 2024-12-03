class ExpenseTracker {
  constructor() {
    this.username = localStorage.getItem('currentUsername');
    this.expenses = [];
    this.loadExpenses();
    this.initializeChart();
    this.setupEventListeners();
  }

  async loadExpenses() {
    try {
      const response = await fetch(`http://localhost:8000/expenses/${this.username}`);
      const data = await response.json();
      this.expenses = data.expenses;
      this.updateUI();
      this.updateChart();
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  }

  initializeChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.getLast7Days(),
        datasets: [{
          label: 'Daily Expenses',
          data: this.getDailyTotals(),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'transparent',
          tension: 0.1
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

  setupEventListeners() {
    const form = document.getElementById('expenseForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const amount = document.getElementById('amount');
      const description = document.getElementById('description');
      
      const expense = {
        username: this.username,
        amount: Number(amount.value),
        description: description.value,
        date: new Date().toISOString()
      };

      try {
        const response = await fetch('http://localhost:8000/expenses/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(expense)
        });

        const result = await response.json();
        if (result.result === 'true') {
          this.loadExpenses(); // Reload expenses from server
          amount.value = '';
          description.value = '';
        }
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    });
  }

  addExpense(expense) {
    this.expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
    this.updateUI();
    this.updateChart();
  }

  getDailyTotals() {
    const days = this.getLast7Days();
    return days.map(day => {
      return this.expenses
        .filter(exp => exp.date.startsWith(day))
        .reduce((sum, exp) => sum + exp.amount, 0);
    });
  }

  getLast7Days() {
    return Array.from({length: 7}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();
  }

  updateUI() {
    const today = new Date().toISOString().split('T')[0];
    const dailyTotal = this.expenses
      .filter(exp => exp.date.startsWith(today))
      .reduce((sum, exp) => sum + exp.amount, 0);
    document.getElementById('dailyTotal').textContent = dailyTotal.toFixed(2);
  }

  updateChart() {
    this.chart.data.datasets[0].data = this.getDailyTotals();
    this.chart.update();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ExpenseTracker();
});