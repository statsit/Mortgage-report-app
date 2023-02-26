const resultFormatter = (result, currency='NGN') => {
    return Intl.NumberFormat('en', { style: 'currency', 
    currency: currency, 
    notation: 'compact',
    maximumFractionDigits: 1}).format(result);
};

const resultLongFormatter = (result, currency='NGN') => {
    return Intl.NumberFormat('en', {maximumFractionDigits: 1}).format(result);
};

const totalPaymentMade = (principal, balance) => {
    return principal - balance;
}


const percentTotalPaid = (principal, balance) => {
    const result = ((principal - balance) / principal) *100;
    return Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 }).format(result);
}

const nairaToDollar = (naira, exchange=465) => {
    return naira / exchange;
}



export { resultFormatter, resultLongFormatter, totalPaymentMade, percentTotalPaid, nairaToDollar };