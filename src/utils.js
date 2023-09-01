// The Initial principal amount is 54,500,000
const PRINCIPAL = 54500000;

const resultFormatter = (result, currency='NGN') => {
    // Format the result to a currency format
    return Intl.NumberFormat('en', { 
        style: 'currency', 
        currency: currency, 
        notation: 'compact',
        maximumFractionDigits: 1}
    ).format(result);
};

const resultLongFormatter = (result, currency='NGN') => {
    // Format the result to a currency format
    return Intl.NumberFormat('en', {
        style: 'currency', 
        currency: currency, 
        maximumFractionDigits: 1 }
    ).format(result);
};

const totalPaymentMade = (principal, balance) => {
    // Calculate the difference between the initial principal and the balance
    return principal - balance;
}


const percentTotalPaid = (principal, balance) => {
    // Calculate the percentage of the total payment made
    const result = ((principal - balance) / principal) *100;
    return Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 }).format(result);
}

const nairaToDollar = (naira, exchange=465) => {
    // Convert Naira to Dollar
    return naira / exchange;
}

const modifyData = (dataArray) => {
    // Modify the data to include the change in monthly repayment
    let reversedDataArray = dataArray.reverse();

    reversedDataArray.forEach((item) => {
        item.change = 0;
    });

    for (let i = 1; i < reversedDataArray.length; i++) {

        let change =  (reversedDataArray[i].monthly_repayment_aud - reversedDataArray[i-1].monthly_repayment_aud) / reversedDataArray[i].monthly_repayment_aud;
        reversedDataArray[i].change = change * 100;
        reversedDataArray[i].deltaType = (change >= 0) ? (change===0 ? "unchanged": "increase") : "decrease";
    }
    
    // console.log(reversedDataArray)
    return reversedDataArray.reverse();

};


export { PRINCIPAL, resultFormatter, resultLongFormatter, totalPaymentMade, percentTotalPaid, nairaToDollar, modifyData };