import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { List } from 'immutable';
import CustomAvatar from '../../components/avatars/avatars';
import Grid from '@material-ui/core/Grid';
import toastr from 'toastr';


const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing(1),
        backgroundColor: theme.palette.primary.medium,
        color: theme.palette.common.white,
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    }
});


let Tier1TableToolbar = props => {
    const { numSelected, numComps, eventName, classes } = props;
    return (
        <Toolbar className={classes.root}>
            {numSelected > 0 ? (
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Typography color="inherit" variant="h4">
                            {numSelected} selected
          </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography color="inherit" variant="h4">
                            {eventName}
                        </Typography>
                    </Grid>
                </Grid>
            ) : (
                    <Typography variant="h4" id="tableTitle" className={classes.root}>
                        Pick {numComps + 1}
                    </Typography>
                )}
        </Toolbar>
    );
};

Tier1TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

Tier1TableToolbar = withStyles(toolbarStyles)(Tier1TableToolbar);



const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 100,
    },
    image: {
        height: 60,
        width: 60,
    },
    select: {
        width: 12
    },
    horse: {
        width: 100
    },
    rider: {
        width: 100
    },
    avatar: {
        width: 25
    },
    description: {
        width: 200
    },
    country: {
        width: 25
    },
    tablerow: {
        backgroundColor: theme.palette.primary.main
    }
});

const CustomHeaderCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.medium,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);



class Tier1Table extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'rider',
            selected: []
        };
        this.handleRequestSort = this.handleRequestSort.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.getCompetitors = this.getCompetitors.bind(this);
        this.renderChecks = this.renderChecks.bind(this);
    }

    componentWillMount() {
        this.renderChecks(this.props.team);
    }

    componentDidUpdate(prevProps) {
        if (typeof prevProps.team !== "undefined") {
        console.log('PREPROPS::', prevProps)
        if (prevProps.team.size !== this.props.team.size) {
            this.renderChecks(this.props.team);
        }
    }
    }

    renderChecks(team) {
        const { selected } = this.state;
        let newSelected = [];
        if (team) {
            team.forEach(competitor => {
                if (competitor.tier === '1') {
                    var selectedIndex = selected.indexOf(competitor.key);
                    if (selectedIndex === -1) {
                        newSelected = newSelected.concat(selected, competitor.key)
                        this.setState({ selected: newSelected });
                    }
                }
            })
        }
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.props.competitorData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.props.competitorData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    updateTeam(competitorKeys) {
        const changes = {
            profileName: this.props.profile.list.get(0).profileName,
            profilePic: this.props.profile.list.get(0).profilePic,
            score: this.props.profile.list.get(0).score,
            teamKeysTier1: competitorKeys.toString(),
            teamKeysTier2: this.props.profile.list.get(0).teamKeysTier2
        }
        console.log("CHANGES::", changes)
        console.log("KEY::", this.props.profile.list.get(0).key)
        this.props.updateProfile(this.props.profile.list.get(0).key, changes);
    }

    handleClick = (event, competitor) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(competitor.key);
        let newSelected = [];

        if (competitor.tier === '1') {
            if (selectedIndex === -1 && selected.length > 2) {
                toastr.info("You have reached the max for Tier 1 selectable competitors.  Deselect if you want to pick someone different.")
                newSelected = newSelected.concat(selected.slice(selected));
            } else if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, competitor.key);
                this.updateTeam(newSelected);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
                this.updateTeam(newSelected);
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
                this.updateTeam(newSelected);
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
                this.updateTeam(newSelected);
            }
            this.setState({ selected: newSelected });

        }
    };

    getCompetitors = () => {
        const { tier1 } = this.props;
        return tier1.map(
            value => ({
                value,
                isSelected: this.state.selected.includes(value.key)
            })
        )
    }

    render() {
        const { classes } = this.props;
        // console.log("T1TPROPS::", this.props)
        return (
            <div>
                <Paper className={classes.root}>
                    <Tier1TableToolbar
                        numSelected={this.state.selected.length}
                        numComps={this.props.numComps}
                        eventName={this.props.eventName}
                    />
                    <div>
                        <Table className={classes.table}>
                            <TableHead className={classes.tablehead}>
                                <TableRow className={classes.tablerow}>
                                    <CustomHeaderCell className={classes.select}>Select</CustomHeaderCell>
                                    <CustomHeaderCell className={classes.horse}>Horse</CustomHeaderCell>
                                    <CustomHeaderCell className={classes.rider}>Rider</CustomHeaderCell>
                                    <CustomHeaderCell className={classes.avatar}>Avatar</CustomHeaderCell>
                                    <CustomHeaderCell className={classes.description}>Description</CustomHeaderCell>
                                    <CustomHeaderCell className={classes.country}>Country</CustomHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.getCompetitors().map(competitor => {
                                    // console.log('MYCOMPETITOR2::', competitor);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, competitor.value)}
                                            role="checkbox"
                                            aria-checked={competitor.isSelected}
                                            tabIndex={-1}
                                            key={competitor.value.key}
                                            selected={competitor.isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={competitor.isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {competitor.value.horse}
                                            </TableCell>
                                            <TableCell>{competitor.value.rider}</TableCell>
                                            <TableCell>
                                                <img
                                                    className={classes.image}
                                                    src={competitor.value.pic}
                                                    alt="competitor pic"
                                                />
                                            </TableCell>
                                            <TableCell>{competitor.value.description}</TableCell>
                                            <TableCell><img src={"https://www.countryflags.io/"+competitor.value.country+"/shiny/64.png"} width="40" height="30" alt={competitor.value.country} /></TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </div>
        );
    };
}


Tier1Table.propTypes = {
    classes: PropTypes.object.isRequired,
    competitorData: PropTypes.instanceOf(List),
    team: PropTypes.object,
    numComps: PropTypes.number.isRequired,
    eventName: PropTypes.string.isRequired
};


export default withStyles(styles)(Tier1Table);
