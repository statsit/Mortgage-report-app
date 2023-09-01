import {
    BadgeDelta,
    Button,
    Card,
    DonutChart,
    Flex,
    TabGroup,
    Tab,
    TabList,
    Bold,
    Divider,
    List,
    ListItem,
    Metric,
    Text,
    Title,
    Subtitle,
} from "@tremor/react";

import { ViewColumnsIcon, ChartPieIcon, ArrowDownRightIcon } from "@heroicons/react/20/solid";

import { useState, useEffect } from "react";

import { modifyData,resultFormatter, PRINCIPAL } from "../utils";


const MobileDash = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [paymentData, setpaymentData] = useState([]);

    useEffect(() => {
        const fetchPayment = async () => {
            const response = await fetch('http://localhost:8000/mortgages/5/');
            const data = await response.json();
            setpaymentData(data);
            console.log(data);
        };
        fetchPayment();
    }, [paymentData]);
     

    const repaymentData = modifyData(paymentData);

    let balance = paymentData.map((item) => item.balance)[0];
    let created = paymentData.map((item) => item.created)[0];
    let monthly_repayment_aud = paymentData.map((item) => item.monthly_repayment_aud)[0];

    console.log(monthly_repayment_aud, created)



    const dataForChart=[
        { label: "Paid", value: PRINCIPAL - balance},
        { label: "Balance", value: balance},
    ];


    return (
      <Card className="max-w-md mx-auto">
        <Flex className="space-x-8" justifyContent="between" alignItems="center">
          <Title>Mortgage</Title>
          <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
            <TabList variant="solid">
              <Tab icon={ChartPieIcon}>Chart</Tab>
              <Tab icon={ViewColumnsIcon}>List</Tab>
            </TabList>
          </TabGroup>
        </Flex>
        <Subtitle className="mt-8">{created}</Subtitle>
        <Text>Monthly Repayments:</Text>
        <Metric>$ {Intl.NumberFormat("us").format(monthly_repayment_aud).toString()}</Metric>
        <Text>Monthly Repayments:</Text>
        <Metric>{resultFormatter(balance)}</Metric>
        <Divider />
        <Text className="mt-8">
          <Bold>Mortgage Repayment</Bold>
        </Text>
        <Text>Last 5 Repayments</Text>
        {selectedIndex === 0 ? (
          <DonutChart
            data={dataForChart}
            showAnimation={true}
            colors={["teal", "slate"]}
            category="value"
            index="label"
            valueFormatter={resultFormatter}
            className="mt-6"
          />
        ) : (
          <>
            <Flex className="mt-8" justifyContent="between">
              <Text className="truncate">
                <Bold>Repayment</Bold>
              </Text>
              <Text>Since transaction</Text>
            </Flex>
            <List className="mt-4">
              {repaymentData.map((item) => (
                <ListItem key={item.created}>
                  <Text>{item.created}</Text>
                  <Flex justifyContent="end" className="space-x-2">
                    <Text>{resultFormatter(item.monthly_repayment_aud, 'AUD')}</Text>
                    <BadgeDelta deltaType={item.deltaType} size="xs">
                      {item.change.toFixed(2) + "%"}
                    </BadgeDelta>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </>
        )}
        <Flex className="mt-6 pt-4 border-t">
          <Button size="xs" variant="light" icon={ArrowDownRightIcon} iconPosition="right">
            View more
          </Button>
        </Flex>
      </Card>
    );

};

export default MobileDash;