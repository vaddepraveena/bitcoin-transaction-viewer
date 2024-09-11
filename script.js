async function fetchTransaction() {
    const txHash = document.getElementById('txHash').value;
    const transactionDetails = document.getElementById('transactionDetails');

    if (!txHash) {
        transactionDetails.innerHTML = 'Please enter a transaction hash.';
        return;
    }

    try {
        const response = await fetch(https://api.blockcypher.com/v1/btc/main/txs/${txHash});
        if (!response.ok) throw new Error('Transaction not found');

        const data = await response.json();

        transactionDetails.innerHTML = `
            <p><strong>Transaction Hash:</strong> ${data.hash}</p>
            <p><strong>Total Amount:</strong> ${(data.total / 1e8).toFixed(8)} BTC</p>
            <p><strong>Fees:</strong> ${(data.fees / 1e8).toFixed(8)} BTC</p>
            <p><strong>Confirmations:</strong> ${data.confirmations}</p>
            <p><strong>Inputs:</strong></p>
            <ul>${data.inputs.map(input => <li>${input.addresses[0]} - ${input.output_value / 1e8} BTC</li>).join('')}</ul>
            <p><strong>Outputs:</strong></p>
            <ul>${data.outputs.map(output => <li>${output.addresses[0]} - ${output.value / 1e8} BTC</li>).join('')}</ul>
        `;
    } catch (error) {
        transactionDetails.innerHTML = Error fetching transaction: ${error.message};
    }
}