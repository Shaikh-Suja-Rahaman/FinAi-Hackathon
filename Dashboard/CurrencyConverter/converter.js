document.getElementById('converterForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultDiv = document.getElementById('result');

    if (!amount || !fromCurrency || !toCurrency) {
        resultDiv.textContent = 'Please enter all fields.';
        resultDiv.classList.add('text-red-600');
        return;
    }

    try {
        // Fetch exchange rates
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();

        if (!data || !data.rates) {
            throw new Error('Invalid response from exchange rate API.');
        }

        const rate = data.rates[toCurrency];
        if (!rate) {
            throw new Error(`Unable to get rate for ${toCurrency}.`);
        }

        const convertedAmount = (amount * rate).toFixed(2);
        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        resultDiv.classList.remove('text-red-600');
        resultDiv.classList.add('text-green-600');
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        resultDiv.textContent = 'Error converting currency. Please try again later.';
        resultDiv.classList.add('text-red-600');
    }
});