import React from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import LeagueRowDetail from './leagueRowDetail';
import {
    RowDetailState,
    SortingState,
    IntegratedSorting,
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

import { Getter } from "@devexpress/dx-react-core";

//Material IU Components
import { Avatar, CircularProgress, Paper } from '@material-ui/core';
// Material helpers
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    },
    progressWrapper: {
        paddingTop: '48px',
        paddingBottom: '24px',
        display: 'flex',
        justifyContent: 'center'
    },
    head: {
        backgroundColor: theme.palette.primary.medium,
        color: theme.palette.primary.contrastText
    },
    detail: {
        backgroundColor: '#e4e7eb',
        color: theme.palette.primary.contrastText
    }
});

const TeamAvatar = ({ value, style }) => (
    <Table.Cell>
        <Avatar alt="avatar imagee for rider" src={value} />
    </Table.Cell>
);

const HeaderCellBase = ({ classes, className, ...restProps }) => (
    <TableHeaderRow.Cell
        {...restProps}
        className={`${classes.head} ${className}`}
    />
);


const HeaderCell = withStyles(styles, { name: 'HeaderCellBase' })(HeaderCellBase);

const DetailCellBase = ({ classes, className, ...restProps }) => (
    console.log("RESTPROPS::", { ...restProps }),
    <TableHeaderRow.Cell
        {...restProps}
        className={`${classes.detail} ${className}`}
    />
);

const DetailCell = withStyles(styles, { name: 'DetailCell' })(DetailCellBase);

const Cell = (props) => {
    const { column } = props;
    if (column.name === 'profilePic') {
        return <TeamAvatar {...props} />;
    }
    return <Table.Cell {...props} />;
};

const StubHeaderCelllBase = ({ classes, className, ...restProps }) => (
    <Table.StubHeaderCell
        {...restProps}
        className={`${classes.head} ${className}`} />
);

const StubHeaderCell = withStyles(styles, { name: 'StubHeaderCell' })(StubHeaderCelllBase);

const tableColumnsComputed = ({ tableColumns }) => {
    const [detailColumn, ...restColumns] = tableColumns;
    return [detailColumn, ...restColumns];
};

const getRowId = row => row.uid;

class LeagueTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { name: 'teamName', title: 'Team' },
                { name: 'profilePic', title: 'Avatar' },
                { name: 'score', title: 'Score' },
                { name: 'profileName', title: 'profileName' },
                { name: 'rank', title: 'Rankings' }
            ],
            count: 0,
            rows: this.props.league,
            pageSizes: [5, 10, 15],
            expandedRowIds: [],
            currentPage: 0,
            loading: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.league) {
            if (nextProps.league.length > 1) {
                this.setState({ rows: nextProps.league })
                this.setState({ loading: false })
            }
        }
    }

    handleExpandedRowIdsChange = (expandedRowIds) => {
            this.setState({ expandedRowIds });
            this.setState({ rows: this.props.league });
    }


    render() {
        console.log("LTPROPS::", this.props);
        const { classes } = this.props;
        const { columns, rows, expandedRowIds, pageSizes, loading } = this.state;
        if (loading) {
            return (
                <div className={classes.progressWrapper}>
                    <CircularProgress />
                </div>
            );
        }
        return (
            <div>
                <Paper>
                    <Grid
                        rows={rows}
                        columns={columns}
                        getRowId={getRowId}
                    >
                        <SortingState
                        // defaultSorting={[{ columnName: 'score', direction: 'desc' }]}
                        />
                        <IntegratedSorting />
                        <PagingState
                            defaultCurrentPage={0}
                            pageSize={5}
                        />
                        <RowDetailState
                            expandedRowIds={expandedRowIds}
                            onExpandedRowIdsChange={this.handleExpandedRowIdsChange}
                        />
                        <IntegratedPaging />
                        <Table
                            cellComponent={Cell}
                            stubHeaderCellComponent={StubHeaderCell}
                        />
                        <TableHeaderRow
                            cellComponent={HeaderCell}
                        />
                        <TableRowDetail
                            contentComponent={LeagueRowDetail}
                            cellComponent={DetailCell}
                        />
                        <Getter name="tableColumns" computed={tableColumnsComputed} />
                        <PagingPanel />
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
)(withRouter(LeagueTable));