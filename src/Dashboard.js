"use client";

import { useState, useEffect } from 'react';

import {
    Title,
    Grid,
    Divider,
    Subtitle,
    Flex,
    Text,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    TabGroup,
    SearchSelect,
    SearchSelectItem
} from '@tremor/react';


import { BalanceCard, MonthlyCard , TrackCard} from './components/MetricCard';
import TableView from './components/Table';
import MobileDash from './components/mobile';

import { 
    resultFormatter, 
    totalPaymentMade, 
    percentTotalPaid, 
    nairaToDollar,
    PRINCIPAL
} from './utils';


const Dashboard = () => {
    const [paymentData, setpaymentData] = useState({});

    useEffect(() => {
        const fetchPayment = async () => {
            const response = await fetch('http://localhost:8000/mortgages/latest');
            const data = await response.json();
            setpaymentData(data);
            console.log(data);
        };
        fetchPayment();

    }, []);

   
    const principalAUD = nairaToDollar(PRINCIPAL, paymentData.exchange_rate);
    const balanceAUD = nairaToDollar(paymentData.balance, paymentData.exchange_rate);


    const  paid = totalPaymentMade(PRINCIPAL, paymentData.balance);
    const paidAUD = nairaToDollar(paid);
    const percent = percentTotalPaid(PRINCIPAL, paymentData.balance);
    const monthlyPayment = paymentData.monthly_repayment_aud;
    const monthlyPaymentNaira = monthlyPayment * paymentData.exchange_rate;

    const data=[
        { label: "Paid", value: PRINCIPAL-paymentData.balance},
        { label: "Balance", value: paymentData.balance},
    ];

    const dateRange = ['2023-07-29', '2023-06-28', '2023-06-28', '2023-06-28', '2023-06-28'];
   
    return (
        <main className='p-12'>
            
           <TabGroup className='mt-6'>
                <TabList>
                    <Tab>Desktop</Tab>
                    <Tab>Mobile</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    <dev>
                        <Flex>
                        <dev align="left">
                                <Title color='teal'>Mortgage Tracker</Title>
                                <Subtitle marginTop='mt-3'color='teal'>Mortgage Monitoring Report</Subtitle>
                                <Text marginTop='mt-6' color='slate'>{paymentData.created}</Text>
                        </dev>
                        <dev>
                            <SearchSelect>
                                {dateRange.map((date) => (
                                <SearchSelectItem value="all">{date}</SearchSelectItem>

                                ))}
                            </SearchSelect>
                        </dev>
                        </Flex>
                    </dev>
                        <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                            <BalanceCard 
                                title="Naira"
                                balance={resultFormatter(paymentData.balance)}
                                paid= {resultFormatter(paid)}
                                total={resultFormatter(PRINCIPAL)}
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
                                exchange_rate={paymentData.exchange_rate}
                            />
                        </Grid>
                        <Divider />
                
                        <div marginTop="mt-6">
                            <TrackCard 
                                data={data} 
                                valueFormatter={resultFormatter}
                                />    
                        </div>
                        <Divider /> 
                        <div marginTop="mt-6">
                            <TableView />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <MobileDash />
                    </TabPanel>
                </TabPanels>
           </TabGroup>
        </main>
    )
}

export default Dashboard;