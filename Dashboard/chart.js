document.addEventListener("DOMContentLoaded", function () {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "January",
        "February",
        "March",  
        "April",
        "May",
        "June",
        "July",
      ],
      datasets: [
        {
          label: "Expense",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: "transparent", // Set background to transparent
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});