import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import {
    Card,
    Flex,
    Title,
    Icon,
    Text,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Bold,
    Select,
    SelectItem
} from '@tremor/react';

import { InformationCircleIcon } from "@heroicons/react/20/solid";

import { resultFormatter } from '../utils';

const TableView = () => {
    const [selectedStatus, setSelectedStatus] = useState('5');
    const [repaymentData, setRepaymentData] = useState([]);



    const fetchMonthlyRepayment =  async (selectedStatus) => {
        try {
            let response;

            switch (selectedStatus) {
                case 'all':
                    response = await fetch('http://localhost:8000/mortgages/');
                    break;
                case '5':
                    response = await fetch('http://localhost:8000/mortgages/5/');
                    break;
                case '10':
                    response = await fetch('http://localhost:8000/mortgages/10/');
                    break;
                case '20':
                    response = await fetch('http://localhost:8000/mortgages/20/');
                    break;
                default:
                    response = await fetch('http://localhost:8000/mortgages/5/');
            }

        
            
            const repayment= await response.json();
            // console.log(repayment.data);
            setRepaymentData(repayment);
        }
        catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setSelectedStatus(selectedStatus);
        fetchMonthlyRepayment(selectedStatus);
    }, [selectedStatus]);
   
    const paymentLabel = selectedStatus === 'all' ? 'All' : `last ${selectedStatus}`;
    return (

           
        <Card>
            
            <div className="md:flex justify-between">
                <div>
                    <Flex justifyContent="justify-start" spaceX="space-x-0.5" alignItems="items-center">
                        <Title color="emerald"> Monthly Repayment </Title>
                        <Icon
                            icon={ InformationCircleIcon }
                            color='teal'
                            variant="simple"
                            tooltip="Principal, Interest, Principal Interest, Balance, Monthly Repayment, Monthly Repayment, Exchange Rate are in Naira"
                        />
                    </Flex>
                    <Text className="space-x-1" color='emerald'><Bold>Breakdown of {paymentLabel} Monthly Repayments.</Bold></Text>
                    <br />
                </div>
            </div>
            <div className="max-w-sm mx-auto space-y-6">
                <Select 
                    defaultValue="5"
                    value={selectedStatus} 
                    onValueChange={(value) => setSelectedStatus(value)}
                    >
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="5">Last 5 Payments</SelectItem>
                        <SelectItem value="10">Last 10 Payments</SelectItem>
                        <SelectItem value="20">Last 10 Payments</SelectItem>
                </Select>
            </div>  
            <br />
            <Table marginTop="mt-6">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Created</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Principal</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Interest</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Principal Int</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Balance</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Mth. Payment</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Mth. Payment($)</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-left">Ex. Rate</TableHeaderCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                       repaymentData.map((item) =>(
                        <TableRow key={ item.created }>
                            <TableCell>{ item.created }</TableCell>
                            <TableCell textAlignment="text-right">{ resultFormatter(item.principal, 'NGN') }</TableCell>
                            <TableCell textAlignment="text-right">{ resultFormatter(item.interest) }</TableCell>
                            <TableCell textAlignment="text-right">{ resultFormatter(item.principal_interest) }</TableCell>
                            <TableCell textAlignment="text-right">{ resultFormatter(item.balance) }</TableCell>
                            <TableCell textAlignment="text-right">{ resultFormatter(item.monthly_repayment)}</TableCell>
                            <TableCell textAlignment="text-right">{resultFormatter(item.monthly_repayment_aud, 'AUD')}</TableCell>
                            <TableCell textAlignment="text-right">{item.exchange_rate}</TableCell>
                        </TableRow>
                       ))
                        
                    }
                </TableBody>
            </Table>
        </Card>
       
    );
}

export default TableView;