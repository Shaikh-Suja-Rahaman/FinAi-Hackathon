document.getElementById('loanEligibilityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const income = Number(document.getElementById('income').value);
    const creditScore = Number(document.getElementById('creditScore').value);
    const loanAmount = Number(document.getElementById('loanAmount').value);

    let eligible = false;
    let reason = "";

    if (income < 30000) {
        reason = "Insufficient income.";
    } else if (creditScore < 600) {
        reason = "Low credit score.";
    } else if (loanAmount > income * 5) {
        reason = "Desired loan amount exceeds the maximum allowed based on your income.";
    } else {
        eligible = true;
    }

    const resultDiv = document.getElementById('result');
    if (eligible) {
        resultDiv.textContent = "Congratulations! You are eligible for the loan.";
        resultDiv.className = "text-green-600";
    } else {
        resultDiv.textContent = `Unfortunately, you are not eligible for the loan. Reason: ${reason}`;
        resultDiv.className = "text-red-600";
    }
});