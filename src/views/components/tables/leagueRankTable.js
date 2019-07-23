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

//Material IU Components
import { Avatar, CircularProgress, Paper } from '@material-ui/core';
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
      }
  });

const TeamAvatar = ({ value, style }) => (
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

    componentWillMount() {
        this.props.loadLeague();
        this.props.loadCompetitors();
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
        console.log("RANKPROPS::",this.props)
        console.log("RANK::",this.props.league.filter(x => x.uid === this.props.auth.id))
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
                        />
                        <TableHeaderRow />
                        <TableRowDetail
                            contentComponent={LeagueRowDetail}
                        />
                    </Grid>

                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("MYSTATE::", state)
    return {
        league: state.league,
        competitors: state.competitors,
        auth: state.auth
    }
}

const mapDispatchToProps = Object.assign(
    {},
    leagueActions,
    teamActions,
    adminActions,
);

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
    )(withRouter(LeagueRanktTable));