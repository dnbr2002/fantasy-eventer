import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { RowDetailState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';

import { generateRows } from './generator';

const styles = theme => ({
    detailContainer: {
        margin: '20px',
    },
    title: {
        color: theme.palette.text.primary,
        fontSize: theme.typography.fontSize,
    },
});

const detailColumns = [
    { name: 'subject', title: 'Subject' },
    { name: 'startDate', title: 'Start Date' },
    { name: 'dueDate', title: 'Due Date' },
    { name: 'priority', title: 'Priority' },
    { name: 'status', title: 'Status' },
];
const tableDetailColumnExtensions = [
    { columnName: 'startDate', width: 115 },
    { columnName: 'dueDate', width: 115 },
    { columnName: 'priority', width: 100 },
    { columnName: 'status', width: 125 },
];

const data = [{
    subject: 'mark',
    startDate: 'now',
    dueDate: 'later',
    priority: 'high',
    status: 'incomplete'
}]


let RowDetailBase = ({ row, classes }) => (
    <div className={classes.detailContainer}>
        <div>
            <h5 className={classes.title}>
                {row.name}
                {' '}
                Team
    </h5>
        </div>
        <Paper>
            <Grid
                rows={data}
                columns={detailColumns}
            >
                <Table
                    columnExtensions={tableDetailColumnExtensions}
                />
                <TableHeaderRow />
            </Grid>
        </Paper>
    </div>
);

const RowDetail = withStyles(styles)(RowDetailBase);

// class RowDetail extends React.Component {

// }

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: '', title: 'Rank' },
                { name: 'pic', title: 'Pic' },
                { name: 'teamName', title: 'Tean' },
                { name: 'ProfilePic', title: 'Owner' },
                { name: 'score', title: 'Score' },

            ],
            rows: generateRows({ length: 8 }),
        };
    }

    render() {
        const { rows, columns, expandedRowIds } = this.state;
        // console.log("expandedrowid::", expandedRowIds)

        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <RowDetailState
                        expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={this.changeExpandedDetails}
                    />
                    <Table />
                    <TableHeaderRow />
                    <TableRowDetail
                        contentComponent={RowDetail}
                    />
                </Grid>
            </Paper>
        );
    }
}