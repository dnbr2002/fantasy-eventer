import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    RowDetailState,
    PagingState,
    IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableRowDetail,
    PagingPanel
} from '@devexpress/dx-react-grid-material-ui';

import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';


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
},
{
    subject: 'mark',
    startDate: 'now',
    dueDate: 'later',
    priority: 'high',
    status: 'incomplete'
}]

// const useStyles = makeStyles({
//     avatar: {
//       margin: 10,
//     },
//     bigAvatar: {
//       margin: 10,
//       width: 60,
//       height: 60,
//     },
//   });

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

const TeamAvatar = ({ value, style, ...restProps }) => (
    <Table.Cell>
        <Avatar alt="Remy Sharp" src={value} />
    </Table.Cell>
);


const Cell = (props) => {
    const { column } = props;
    if (column.name === 'profilePic') {
        return <TeamAvatar {...props} />;
    }
    return <Table.Cell {...props} />;
};

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            shouldUpdate: false,
            columns: [
                { name: 'teamName', title: 'Team' },
                { name: 'profilePic', title: 'Avatar' },
                { name: 'score', title: 'Score' },
                { name: 'profileName', title: 'profileName' },
                { name: '', title: 'Rank' }
            ],
            rows: this.props.league,
            pageSizes: [5, 10, 15]
        };
    }

    shouldComponentUpdate(nextProps) {
        if (this.props != nextProps) {
            this.setState({ shouldUpdate: true });
        }
    }


    render() {
        const { rows, columns, expandedRowIds, pageSizes } = this.state;
        console.log("expandedrowid::");

        console.log("TABLEPROPS::", this.state)
        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <PagingState
                        defaultCurrentPage={0}
                        pageSize={5}
                    />
                    <RowDetailState
                        expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={this.changeExpandedDetails}
                    />

                    <IntegratedPaging />
                    <Table
                        cellComponent={Cell}
                    />
                    <TableHeaderRow />
                    <TableRowDetail
                        contentComponent={RowDetail}
                    />
                </Grid>
                <PagingPanel />
            </Paper>
        );
    }
}