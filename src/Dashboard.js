import { useState } from 'react';
import '@tremor/react/dist/esm/tremor.css';

import {
    Title,
    ColGrid,
    Divider,
    Block,
    Subtitle,
    DateRangePicker, 
    Flex,
    Text,
    Bold
} from '@tremor/react';

import { BalanceCard, MonthlyCard , TrackCard} from './MetricCard';
import TableView from './Table';

import { 
    resultFormatter, 
    totalPaymentMade, 
    percentTotalPaid, 
    nairaToDollar
} from './utils';

const EXCHANGE = 465;

const Dashboard = () => {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const today = new Date();
    const principal = 54500000;
    const balance = 45866543.21;
    const principalAUD = nairaToDollar(principal);
    const balanceAUD = nairaToDollar(balance);

    const dateResult = today.toLocaleDateString()

    const  paid = totalPaymentMade(principal, balance);
    const paidAUD = nairaToDollar(paid);
    const percent = percentTotalPaid(principal, balance);
    const monthlyPayment = 3300.00;
    const monthlyPaymentNaira = monthlyPayment * EXCHANGE;

    const data=[
        { label: "Paid", value: principal-balance},
        { label: "Balance", value: balance},
    ];
    return (
        <main>
            <Flex marginTop='mt-8'>
                <div>
                <Title height='20px'>Mortgage Tracker</Title>
                <Subtitle color='black'><Bold>Mortgage Monitoring Report</Bold></Subtitle>
                <Text><Bold>{dateResult}</Bold></Text>
                </div>
                <div>
                <DateRangePicker value={dateRange} onValueChange={setDateRange} />
                </div>
            </Flex>
           
            <ColGrid  numColsSm={3} numColsMd={3} numColsLg={3} gapX="gap-x-3" gapY="gap-y-3" marginTop="mt-8">
                <BalanceCard 
                    title="Naira"
                    balance={resultFormatter(balance)}
                    paid= {resultFormatter(paid)}
                    total={resultFormatter(principal)}
                    percent={percent}/>
                <BalanceCard 
                    title="AU$"
                    balance={resultFormatter(balanceAUD, 'AUD')}
                    paid={resultFormatter(paidAUD, 'AUD')}
                    total={resultFormatter(principalAUD, 'AUD')}
                    percent={percent}
                     />
                <MonthlyCard 
                    monthly={resultFormatter(monthlyPaymentNaira, 'NGN')}
                    monthly_aus={resultFormatter(monthlyPayment, 'AUD')}
                />
                
            </ColGrid>
             <Divider />
             
            <Block marginTop="mt-6">
              <TrackCard 
              data={data} 
              valueFormatter={resultFormatter}
              />    
            </Block>
            <Divider />
            <Block marginTop="mt-6">
                <TableView />
            </Block>

        </main>
    )
}

export default Dashboard;