import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as leagueActions from '../../../actions/leagueActions';
import * as teamActions from '../../../actions/teamActions';
import * as adminActions from '../../../actions/adminActions';
import LeagueRowDetail from './leagueRowDetail';
import Paper from '@material-ui/core/Paper';
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
import Avatar from '@material-ui/core/Avatar';



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

    componentWillMount() {
        this.props.loadLeague();
        this.props.loadCompetitors();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.league.length > 1) {
            this.setState({ rows: nextProps.league })
        }
    }

    handleExpandedRowIdsChange = (expandedRowIds) => {
        this.setState({ expandedRowIds });
    }

    render() {
        const { columns, rows, expandedRowIds, pageSizes } = this.state;
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
                        />
                        <TableHeaderRow />
                        <TableRowDetail
                            contentComponent={LeagueRowDetail}
                        />

                        <PagingPanel />
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
        // team: LeagueTeamSelector(state),
        competitors: state.competitors
    }
}

const mapDispatchToProps = Object.assign(
    {},
    leagueActions,
    teamActions,
    adminActions,
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeagueTable));