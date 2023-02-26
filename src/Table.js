import { useState } from 'react';
import {
    BadgeDelta,
    Card,
    // DeltaType,
    // Dropdown,
    // DropdownItem,
    Flex,
    // MultiSelectBox,
    // MultiSelectBoxItem,
    Block,
    Title,
    // Icon,
    Text,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';

import { resultFormatter, resultLongFormatter } from './utils';

// export type SalesPerson = {
//     name: string,
//     leads: number,
//     sales: string,
//     quota: string,
//     variance: string,
//     region: string,
//     status: string,
//     deltaType: DeltaType,
// }

export const mortgageRepayment = [
    {
		created : "2023-02-26",
		principal : resultLongFormatter(48771712.73),
		interest : resultLongFormatter(609646.41),
		principal_interest : resultLongFormatter(49841212.73),
		balance : resultLongFormatter(48311859.14),
		monthly_replayment : resultLongFormatter(1069500.0),
        monthly_replayment_aus : resultFormatter(2300, 'AUD'),
		status: 'paid',
       deltaType: 'increase',
	},
    {
		created : "2023-01-30",
		principal : resultLongFormatter(49225889.12),
		interest : resultLongFormatter(615323.61),
		principal_interest : resultLongFormatter(49841212.73),
		balance : resultLongFormatter(48771712.73),
		monthly_replayment : resultLongFormatter(1069500),
        monthly_replayment_aus : resultFormatter(2300, 'AUD'),
		status: 'paid',
       deltaType: 'increase',
	},
    {
		created : "2022-12-29",
		principal : resultLongFormatter(49674458.39),
		interest : resultLongFormatter(620930.73),
		principal_interest : resultLongFormatter(50295389.12),
		balance : resultLongFormatter(49225889.12),
		monthly_replayment : resultLongFormatter(1069500),
        monthly_replayment_aus : resultFormatter(2300, 'AUD'),
		status: 'paid',
       deltaType: 'increase',
	},
    {
		created : "2022-11-30",
		principal : resultLongFormatter(50117489.77),
		interest : resultLongFormatter(626468.62),
		principal_interest : resultLongFormatter(50743958.39),
		balance : resultLongFormatter(49674458.39),
		monthly_replayment : resultLongFormatter(1069500),
        monthly_replayment_aus : resultFormatter(2300, 'AUD'),
		status: 'paid',
       deltaType: 'increase',
	},
];

const TableView = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedNames, setSelectedNames] = useState([]);

    const isMortgageRepaymentSelected = (mortgageRepaymentRecord) => (
        (mortgageRepaymentRecord.status === selectedStatus || selectedStatus === 'all')
            && (selectedNames.includes(mortgageRepaymentRecord.created) || selectedNames.length === 0)
    );

    return (
        <Card>
            {/* <div className="sm:mt-6 hidden sm:flex sm:justify-start sm:space-x-2">
                <MultiSelectBox
                    handleSelect={ (value) => setSelectedNames(value) }
                    placeholder="Select Salespeople"
                    maxWidth="max-w-xs"
                >
                    { salesPeople.map((item) => (
                        <MultiSelectBoxItem key={ item.name } value={ item.name } text={ item.name } />
                    )) }
                </MultiSelectBox>
                <Dropdown
                    maxWidth="max-w-xs"
                    defaultValue="all"
                    handleSelect={ (value) => setSelectedStatus(value) }
                >
                    <DropdownItem value="all" text="All Performances" />
                    <DropdownItem value="overperforming" text="Overperforming" />
                    <DropdownItem value="average" text="Average" />
                    <DropdownItem value="underperforming" text="Underperforming" />
                </Dropdown>
            </div> */}
            {/* <div className="mt-6 sm:hidden space-y-2 sm:space-y-0">
                <MultiSelectBox
                    handleSelect={ (value) => setSelectedNames(value) }
                    placeholder="Select Salespeople"
                    maxWidth="max-w-full"
                >
                    { salesPeople.map((item) => (
                        <MultiSelectBoxItem key={ item.name } value={ item.name } text={ item.name } />
                    )) }
                </MultiSelectBox>
                <Dropdown
                    maxWidth="max-w-full"
                    defaultValue="all"
                    handleSelect={ (value) => setSelectedStatus(value) }
                >
                    <DropdownItem value="all" text="All Performances" />
                    <DropdownItem value="overperforming" text="Overperforming" />
                    <DropdownItem value="average" text="Average" />
                    <DropdownItem value="underperforming" text="Underperforming" />
                </Dropdown>
            </div> */}
            <div className="md:flex justify-between">
            <Block>
                <Flex justifyContent="justify-start" spaceX="space-x-0.5" alignItems="items-center">
                    <Title> Monthly Repayment </Title>
                    {/* <Icon
                        icon={ InformationCircleIcon }
                        variant="simple"
                        tooltip="Green represents the amount paid, while Grey represents the amount remaining"
                    /> */}
                </Flex>
                <Text> Breakdown of all monthly Repayment</Text>
            </Block>
         </div>
            
            <Table marginTop="mt-6">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Created</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Principal (N)</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Interest (N)</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Principal Interest (N)</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Balance</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Monthly Payment</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-right">Monthly Payment(A$)</TableHeaderCell>
                        <TableHeaderCell textAlignment="text-left">Status</TableHeaderCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    { mortgageRepayment.filter((item) => isMortgageRepaymentSelected(item)).map((item) => (
                        <TableRow key={ item.name }>
                            <TableCell>{ item.created }</TableCell>
                            <TableCell textAlignment="text-right">{ item.principal }</TableCell>
                            <TableCell textAlignment="text-right">{ item.interest }</TableCell>
                            <TableCell textAlignment="text-right">{ item.principal_interest }</TableCell>
                            <TableCell textAlignment="text-right">{ item.balance }</TableCell>
                            <TableCell textAlignment="text-right">{ item.monthly_replayment}</TableCell>
                            <TableCell textAlignment="text-right">{ item.monthly_replayment_aus}</TableCell>
                            <TableCell textAlignment="text-left">
                                <BadgeDelta deltaType={ item.deltaType } text={ item.status } size="xs" />
                            </TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        </Card>
    );
}

export default TableView;