import * as React from 'react';
import { connect } from 'react-redux';
import * as leagueActions from '../../../actions/leagueActions';
import * as teamActions from '../../../actions/teamActions';
import * as adminActions from '../../../actions/adminActions';
import { LeagueTeamSelector } from '../../../selectors/leagueSelector';
import Paper from '@material-ui/core/Paper';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
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

const TeamAvatar = ({ value, style }) => (
    <Table.Cell>
        <Avatar alt="Remy Sharp" src={value} />
    </Table.Cell>
);


const Cell = (props) => {
    const { column } = props;
    console.log("DATA_PROP2::", props)
    if (column.name === 'profilePic') {
        return <TeamAvatar {...props} />;
    }
    return <Table.Cell {...props} />;
};

class RowDetailBase extends React.Component {
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
            data: []
        }
        
        
    }
    componentWillMount() {
        this.props.loadCompetitors();
    }

    // componentWillReceiveProps(nextProps) {
    //     // console.log("UID::",nextProps.row.uid)
    //         if(nextProps.row.uid)
    //         {
    //             this.props.loadTeamLeague(nextProps.row.uid);
    //         }
                      
    // }


    render() {
        const { data, columns } = this.state;
        const { classes, row } = this.props;
        console.log("RDB::",this.props)
        return (
            <div>
                <div className={classes.detailContainer}>
                    <div>
                        <h5 className={classes.title}>

                            {' '}                Team
                </h5>
                    </div>
                    <Paper>
                        <Grid
                            rows={data}
                            columns={columns}
                        >
                            <Table
                                cellComponent={Cell}
                            />
                            <TableHeaderRow />
                        </Grid>
                    </Paper>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("MYSTATE::", state)
    return {
        league: state.league,
        team: LeagueTeamSelector(state),
        competitors: state.competitors
    }
}

const mapDispatchToProps = Object.assign(
    {},
    leagueActions,
    teamActions,
    adminActions,
);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RowDetailBase));