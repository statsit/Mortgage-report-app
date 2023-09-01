import React from "react";

import { 
    Card, 
    Metric, 
    Text, 
    Flex, 
    ProgressBar, 
    DonutChart, 
    Divider,
    Button, 
    Badge, 
    Bold,
    Title,
    Icon,
} from "@tremor/react";

import { InformationCircleIcon } from "@heroicons/react/20/solid";


const BalanceCard = ({title, balance, paid, total, percent}) => {
    return (
        <Card maxWidth="max-w-sm" decoration="top" decorationColor="teal">
            <Flex alignItems="start">
                <Text><Bold>Principal Balance ({title})</Bold></Text>
                <Badge color="teal" size='md'>@ 15% </Badge>
            </Flex>
            <Metric>{balance}</Metric>
            <Divider />
            <div>
                <div>
                <Flex>
                    <Text><Bold>{paid} ({percent}%)</Bold></Text>
                    <Text><Bold>{total}</Bold></Text>
                </Flex>
                <ProgressBar value={percent} color="teal" marginTop="mt-4" />
                </div>
            </div>
        
        </Card>
        
)};

const MonthlyCard = ({monthly, monthly_aus, exchange_rate}) => {
    const text = `${monthly_aus}`;
    const exchange = `@${exchange_rate} Naira` ;
    return (
        <Card maxWidth="max-w-sm" decoration="top" decorationColor="teal">
            <Flex alignItems="start">
            <Text><Bold>Monthly Repayment</Bold></Text>
            <Badge color="teal" size='md'>{exchange}</Badge>
            </Flex>
            <Metric>{monthly}</Metric>
            <Divider />
            <div>
                <Flex justifyContent="end" alignItems="end">
                    <div align="right">
                    <Text><Bold>Amount Transferred</Bold></Text>
                    <Button color="teal" size="md" variant="secondary"><Bold>{text}</Bold></Button>
                    </div>
                   
                </Flex>
                
            </div>
        </Card>
)};

const TrackCard = ({data, valueFormatter}) => {
    return (
        <Card>
         <div className="md:flex justify-between">
            <div>
                <Flex justifyContent="start" spaceX="space-x-0.5" alignItems="center">
                    <Title> Payment Tracker </Title>
                    <Icon
                        icon={ InformationCircleIcon }
                        color="teal"
                        variant="simple"
                        tooltip="Green represents the amount paid, while Grey represents the amount remaining"
                    />
                </Flex>
                <Text> Green represents the amount paid, while Grey represents the amount remaining </Text>
            </div>
         </div>
         <DonutChart
            data={data}
            category="value"
            index="label"
            colors={["teal", "slate"]}
            valueFormatter={valueFormatter}
            showLabel={true}
            showAnimation={true}
            // height="h-80"
            marginTop="mt-10"
        /> 
        </Card>
    )
}

export {BalanceCard, MonthlyCard, TrackCard};