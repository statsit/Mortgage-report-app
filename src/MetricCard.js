import React from "react";

import { 
    Card, 
    Metric, 
    Text, 
    Footer, 
    Flex, 
    ProgressBar, 
    Block, 
    DonutChart, 
    Button, 
    Badge, 
    Bold,
    Title,
    Icon,
} from "@tremor/react";

import { InformationCircleIcon } from '@heroicons/react/outline';


const BalanceCard = ({title, balance, paid, total, percent}) => {
    return (
        <Card maxWidth="max-w-sm">
            <Flex justifyContent="justify-between" alignItems="items-center">
            <Text><Bold>Principal Balance ({title})</Bold></Text>
            <Badge text="@ 15%"  size='md'/>
            </Flex>
            <Metric>{balance}</Metric>
            <Footer height="h-16">
                <Block>
                <Flex>
                    <Text><Bold>{paid} ({percent}%)</Bold></Text>
                    <Text><Bold>{total}</Bold></Text>
                </Flex>
                <ProgressBar percentageValue={percent} color="teal" marginTop="mt-4" />
                </Block>
            </Footer>
        
        </Card>
)};

const MonthlyCard = ({monthly, monthly_aus}) => {
    const text = `${monthly_aus}`;
    return (
        <Card maxWidth="max-w-sm">
            <Flex justifyContent="justify-between" alignItems="items-center">
            <Text><Bold>Monthly Repayment</Bold></Text>
            <Badge text="@ 465 Naira"  size='md'/>
            </Flex>
            <Metric>{monthly}</Metric>
            <Footer height="h-16">
                <Flex justifyContent="justify-end" alignItems="items-end">
                    <Block>
                    <Text><Bold>Amount Transferred</Bold></Text>
                    </Block>
                    <Button text={text} size="sx" importance="secondary" />
                </Flex>
                
            </Footer>
        </Card>
)};

// let remaining = 48771712.73
// const data=[
//     { label: "Paid", value: 54500000.00-remaining},
//     { label: "Balance", value: remaining},
// ];

// const valueFormatter = (number) => (
//     `N ${Intl.NumberFormat().format(number).toString()}`
// );

const TrackCard = ({data, valueFormatter}) => {
    return (
        <Card>
         <div className="md:flex justify-between">
            <Block>
                <Flex justifyContent="justify-start" spaceX="space-x-0.5" alignItems="items-center">
                    <Title> Payment Tracker </Title>
                    <Icon
                        icon={ InformationCircleIcon }
                        variant="simple"
                        tooltip="Green represents the amount paid, while Grey represents the amount remaining"
                    />
                </Flex>
                <Text> Green represents the amount paid, while Grey represents the amount remaining </Text>
            </Block>
         </div>
         <DonutChart
            data={data}
            category="value"
            dataKey="label"
            colors={["teal", "gray"]}
            valueFormatter={valueFormatter}
            showLabel={true}
            showAnimation={true}
            height="h-80"
            marginTop="mt-10"
        /> 
        </Card>
    )
}

export {BalanceCard, MonthlyCard, TrackCard};