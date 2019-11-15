import React from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import LeagueRowDetail from './leagueRowDetail';
import {
    RowDetailState,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableRowDetail,
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
        <Avatar alt="Remy Sharp" src={value} />
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


const getRowId = row => row.rank;

class LeagueRanktTable extends React.Component {
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
            rows: this.props.league.filter(x => x.uid === this.props.auth.id),
            pageSizes: [5, 10, 15],
            expandedRowIds: [],
            currentPage: 0,
            loading: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.league.length > 1) {
            this.setState({ rows: nextProps.league.filter(x => x.uid === this.props.auth.id) })
            this.setState({ loading: false })
        }
    }

    handleExpandedRowIdsChange = (expandedRowIds) => {
        this.setState({ expandedRowIds });
    }


    render() {
        const { classes } = this.props;
        const { columns, rows, expandedRowIds, pageSizes, loading } = this.state;
        console.log("RANKPROPS::", this.props)
        console.log("RANK::", this.props.league.filter(x => x.uid === this.props.auth.id))
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
                        <RowDetailState
                            expandedRowIds={expandedRowIds}
                            onExpandedRowIdsChange={this.handleExpandedRowIdsChange}
                        />
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
                    </Grid>

                </Paper>
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
)(withRouter(LeagueRanktTable));