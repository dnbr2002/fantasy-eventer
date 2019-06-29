import * as React from 'react';
import { connect } from 'react-redux';
import * as leagueActions from '../../../actions/leagueActions';
import * as teamActions from '../../../actions/teamActions';
import * as adminActions from '../../../actions/adminActions';
import { LeagueTeamSelector } from '../../../selectors/leagueTeamSelector';
import Paper from '@material-ui/core/Paper';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Flag from 'react-world-flags'

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
    if (column.name === 'pic') {
        return <TeamAvatar {...props} />;
    }
    if (column.name === 'country') {
        return <Table.Cell> <img src="https://www.countryflags.io/us/shiny/64.png" width="50" height="30" /> </Table.Cell>
    }
    return <Table.Cell {...props} />;
};

class RowDetailBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { name: 'country', title: 'Country' },
                { name: 'horse', title: 'Horse' },
                { name: 'rider', title: 'Rider' },
                { name: 'tier', title: 'Tier' },
                { name: 'pic', title: 'Avatar' },
                { name: 'score', title: 'Score' }
            ],
            data: []
        }
        
        
    }
    componentWillMount() {
        this.props.loadCompetitors();
        
    }

    componentWillUnmount() {
        this.setState({data: []})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.team){
            if(nextProps.team.size != this.state.data.length)
            {
                console.log("RDB2::",nextProps.team);
                var arr = []
                nextProps.team.map(x => {
                    arr.push(x)
                })
                console.log("RDB3::",arr);
                this.setState({data: arr})
            }
        }
                      
    }


    render() {
        const { data, columns } = this.state;
        const { classes, row } = this.props;
        console.log("RDB::",this.props)
        console.log("RDB1::",this.state)
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