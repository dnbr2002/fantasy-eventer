import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import * as leagueActions from '../../../actions/leagueActions';
import * as teamActions from '../../../actions/teamActions';
import * as adminActions from '../../../actions/adminActions';
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
import { fade } from '@material-ui/core/styles/colorManipulator';
// Material helpers

import { withStyles } from '@material-ui/core';

//Loader
import { Loader } from '../../components/loader'


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


// const getRowId = row => (
//     console.log("ROW::", row),
//     row.rank
// );
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

    // componentWillMount() {
    //     this.props.loadLeague();
    //     this.props.loadCompetitors();
    // }

    componentWillReceiveProps(nextProps) {
        if (this.props.league) {
            console.log("NPROWS::", nextProps.league)
            if (nextProps.league.length > 1) {
                this.setState({ rows: nextProps.league })
                this.setState({ loading: false })
            }
        }
    }

    //     componentDidUpdate(prevProps) {
    //         console.log("UPDATE::", this.props.league);
    //         if(this.props.league){
    //             // console.log("UPDATE2::", this.props.league.ln);
    //         if (this.state.rows.length !== this.props.league.length) {
    //             this.setState({rows: this.props.league})
    //         }        
    //     }
    // }

    handleExpandedRowIdsChange = (expandedRowIds) => {
        // if (expandedRowIds.length > 0) {
        //     const minusOne = expandedRowIds.map(num => num - 1);
        //     console.log("LTPROPS1::", minusOne);
        //     this.setState({ minusOne });
        //     this.setState({ rows: this.props.league });
        // }
        // else {
            console.log("LTPROPS2::", expandedRowIds);
            this.setState({ expandedRowIds });
            this.setState({ rows: this.props.league });
        // }
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

// const mapStateToProps = (state, ownProps) => {
//     console.log("MYSTATE::", state)
//     return {
//         league: state.league,
//         competitors: state.competitors
//     }
// }

// const mapDispatchToProps = Object.assign(
//     {},
//     leagueActions,
//     adminActions,
// );

export default compose(
    withStyles(styles),
    // connect(mapStateToProps, mapDispatchToProps)
)(withRouter(LeagueTable));