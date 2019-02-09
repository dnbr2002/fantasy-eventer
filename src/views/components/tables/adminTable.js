import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { List } from 'immutable';
import CustomAvatar from '../../components/avatars/avatars';
import * as teamActions from '../../../actions/teamActions';
// import * as adminActions from '../../../actions/adminActions';

var competitors = [];

// let AdminTableToolbar = props => {
//     const { removeCompetitors } = props;
//     return (
//         <Toolbar>
//             <Grid container>
//                 <Grid container
//                     spacing={16}
//                     alignItems="stretch"
//                     direction="row"
//                     justify="space-between"
//                 >
//                     <Grid>
//                         <Button variant="raised" size="small" color="secondary" onClick={removeCompetitors} type="submit">Remove</Button>
//                     </Grid>

//                 </Grid>
//             </Grid>

//         </Toolbar>
//     );
// };

// AdminTableToolbar.propTypes = {
//     removeCompetitors: PropTypes.func.isRequired,
// };

const CustomHeaderCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 100,
    },
});

class AdminTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'rider',
            selected: [],
            editIdx: -1,
            value: '2'
        };
        this.handleRequestSort = this.handleRequestSort.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.getCompetitors = this.getCompetitors.bind(this);
        // this.removeCompetitors = this.removeCompetitors.bind(this);
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

    componentDidUpdate(prevProps) {
        // const prev = prevProps.competitors.map(comps => comps.scores);
        // const pres = this.props.competitors.map(comps => comps.scores);
        // const redprev = prev.reduce((total, value) => total + value, 0);
        // const redpres = pres.reduce((total, value) => total + value, 0);        
        // if (redprev !== redpres) {
        //     this.props.bulkUpdateScores(this.props.competitors);
        // }
    }

    handleClick = (event, competitor) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(competitor.key);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, competitor.key);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({ selected: newSelected });
        console.log()
        competitors.push(competitor);
    };

    // removeCompetitors() {
    //     console.log("RMCOMPS::", competitors)
    //     this.props.removeCompetitors(competitors);
    //     this.props.bulkRemoveCompetitors(competitors);
    // }

    keyDown = (event) => {
        if (event.charCode === 13) {
        this.setState({editIdx: -1})
    }

    }

    handleRemove = (competitor) => {
        console.log("RMCOMP::", competitor)
        this.props.removeCompetitor(competitor);
        this.props.bulkRemoveCompetitor(competitor);
    }

    getCompetitors = () => {
        const { competitors } = this.props; 
        return competitors.map(
            value => ({
                value,
                isSelected: this.state.selected.includes(value.key)
            })
        )
    }

    stopEditing = () => {
        this.setState({ editIdx: -1 });
    }

    startEditing = (i) => {
        this.setState({ editIdx: i });
    }

    handleChange = (e, key) => {
        e.preventDefault();
        const valueName = e.target.name
        const competitor = {
            [valueName]: e.target.value
        }
        this.props.updateCompetitor(key, competitor, this.props.competitors);
    }

    render() {
        const { classes } = this.props;
        console.log("ADMINTABLEPROPS::",this.props.competitors)
        return (
            <div>
                <Paper className={classes.root}>
                    {/* <AdminTableToolbar
                        removeCompetitors={this.removeCompetitors}
                    /> */}
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {/* <CustomHeaderCell>Select</CustomHeaderCell> */}
                                <CustomHeaderCell>Edit</CustomHeaderCell>
                                <CustomHeaderCell>Score</CustomHeaderCell>
                                <CustomHeaderCell>Horse</CustomHeaderCell>
                                <CustomHeaderCell>Rider</CustomHeaderCell>
                                <CustomHeaderCell>Tier</CustomHeaderCell>
                                <CustomHeaderCell>Avatar</CustomHeaderCell>
                                <CustomHeaderCell>Description</CustomHeaderCell>
                                <CustomHeaderCell>Country</CustomHeaderCell>
                                <CustomHeaderCell>Delete</CustomHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.getCompetitors().map((competitor, i) => {
                                const currentlyEditing = this.state.editIdx === i
                                // console.log('THEROWS::', competitor)
                                return (
                                    <TableRow
                                        hover
                                        // onClick={event => this.handleClick(event, competitor.value)}
                                        // role="checkbox"
                                        // aria-checked={competitor.isSelected}
                                        tabIndex={-1}
                                        key={i}
                                    // selected={competitor.isSelected}
                                    >
                                        {/* <TableCell padding="checkbox">
                                            <Checkbox checked={competitor.isSelected} />
                                        </TableCell> */}
                                        <TableCell>
                                            {currentlyEditing ? (
                                                <IconButton>
                                                    <CheckIcon onClick={() => this.stopEditing()} /></IconButton>
                                            ) : (
                                                    <IconButton><EditIcon onClick={() => this.startEditing(i)} /></IconButton>
                                                )}
                                        </TableCell>
                                        <TableCell>
                                            {currentlyEditing ? (<TextField
                                                name="score"
                                                onChange={e => this.handleChange(e, competitor.value.key)}
                                                value={competitor.value.score}
                                                onKeyPress={this.keyDown}
                                            />
                                            ) : (competitor.value.score)}
                                        </TableCell>
                                        <TableCell>
                                            {currentlyEditing ? (<TextField
                                                name="horse"
                                                onChange={e => this.handleChange(e, competitor.value.key)}
                                                value={competitor.value.horse}
                                                onKeyPress={this.keyDown}
                                            />
                                            ) : (
                                                    competitor.value.horse
                                                )}
                                        </TableCell>
                                        <TableCell>
                                            {currentlyEditing ? (<TextField
                                                name="rider"
                                                onChange={e => this.handleChange(e, competitor.value.key)}
                                                value={competitor.value.rider}
                                                onKeyPress={this.keyDown}
                                            />
                                            ) : (competitor.value.rider)}
                                        </TableCell>
                                        <TableCell>
                                            {currentlyEditing ? (<TextField
                                                name="tier"
                                                onChange={e => this.handleChange(e, competitor.value.key)}
                                                value={competitor.value.tier}
                                                onKeyPress={this.keyDown}
                                            />
                                            ) : (competitor.value.tier)}
                                        </TableCell>
                                        <TableCell>
                                            {currentlyEditing ? (<TextField
                                                name="pic"
                                                onChange={e => this.handleChange(e, competitor.value.key)}
                                                value={competitor.value.pic}
                                                onKeyPress={this.keyDown}
                                            />
                                            ) : (<CustomAvatar
                                                src={competitor.value.pic}
                                                alt="competitor pic"
                                                bigAvatar="BigAvatar"
                                            />)}
                                        </TableCell>
                                        <TableCell>
                                            {currentlyEditing ? (<TextField
                                                name="description"
                                                onChange={e => this.handleChange(e, competitor.value.key)}
                                                value={competitor.value.description}
                                                onKeyPress={this.keyDown}
                                            />
                                            ) : (competitor.value.description)}
                                        </TableCell>
                                        <TableCell>
                                            {currentlyEditing ? (<TextField
                                                name="country"
                                                onChange={e => this.handleChange(e, competitor.value.key)}
                                                value={competitor.value.country}
                                                onKeyPress={this.keyDown}
                                            />
                                            ) : (competitor.value.country)}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton><DeleteIcon onClick={() => this.handleRemove(competitor)} /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <br />
            </div>
        );
    };
}


AdminTable.propTypes = {
    classes: PropTypes.object.isRequired,
    competitors: PropTypes.instanceOf(List),
    updateCompetitor: PropTypes.func.isRequired,
    removeCompetitor: PropTypes.func.isRequired,
    bulkRemoveCompetitor: PropTypes.func.isRequired,
    bulkRemoveCompetitors: PropTypes.func.isRequired,
    bulkUpdateScores: PropTypes.func.isRequired
};



const mapDispatchToProps = dispatch => ({
    teamActions,
});

export default compose(withStyles(styles), connect(mapDispatchToProps))(AdminTable);
