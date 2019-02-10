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
import toastr from 'toastr';


let Tier2TableToolbar = props => {
  const { numSelected, numComps } = props;
  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subheading">
          {numSelected} selected
          </Typography>
      ) : (
          <Typography variant="title" id="tableTitle">
            Pick {numComps + 1}
          </Typography>
        )}
    </Toolbar>
  );
};

Tier2TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const CustomHeaderCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
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

class Tier2Table extends React.Component {
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
    this.createCompetitor = this.updateTeam.bind(this);
    this.updateTeam = this.updateTeam.bind(this);
  }
  componentWillMount() {
    this.renderChecks(this.props.team);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.team.size !== this.props.team.size) {
      this.renderChecks(this.props.team);
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
      teamKeysTier1: this.props.profile.list.get(0).teamKeysTier1,
      teamKeysTier2: competitorKeys.toString()
  }
  console.log("CHANGES::", changes)
  console.log("KEY::", this.props.profile.key)
  this.props.updateProfile(this.props.profile.list.get(0).key, changes);
  }

  renderChecks(team) {
    const { selected } = this.state;
    let newSelected = [];
    if (team) {
    team.forEach(competitor => {
      if (competitor.tier === '2') {
        var selectedIndex = selected.indexOf(competitor.key);
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, competitor.key)
          this.setState({ selected: newSelected });
        }
      }
    })
  }
  }

  handleClick = (event, competitor) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(competitor.key);
    let newSelected = [];
    if (competitor.tier === '2') {
      if (selectedIndex === -1 && selected.length > 5) {
        toastr.info("You have reached the max for Tier 2 selectable competitors.  Deselect if you want to pick someone else.")
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
    const { tier2 } = this.props;
    return tier2.map(
      value => ({
        value,
        isSelected: this.state.selected.includes(value.key)
      })
    )
  }

  render() {
    const { classes } = this.props;
    // console.log("T1SELECTed2::", this.state.selected);
    // console.log("T1PROPS::", this.props);
    return (
      <div>
        <Paper className={classes.root}>
          <Tier2TableToolbar
            numSelected={this.state.selected.length}
            numComps={this.props.numComps}
            eventName={this.props.eventName}
          />
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomHeaderCell>Select</CustomHeaderCell>
                <CustomHeaderCell>Horse</CustomHeaderCell>
                <CustomHeaderCell>Rider</CustomHeaderCell>
                <CustomHeaderCell>Avatar</CustomHeaderCell>
                <CustomHeaderCell>Description</CustomHeaderCell>
                <CustomHeaderCell>Country</CustomHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.getCompetitors().map(competitor => {
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
                      <CustomAvatar
                        src={competitor.value.pic}
                        alt="competitor pic"
                        bigAvatar="BigAvatar"
                      />
                    </TableCell>
                    <TableCell>{competitor.value.description}</TableCell>
                    <TableCell>{competitor.value.country}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  };
}


Tier2Table.propTypes = {
  classes: PropTypes.object.isRequired,
  competitorData: PropTypes.instanceOf(List),
  numComps: PropTypes.number.isRequired,
  eventName: PropTypes.string.isRequired
};

export default withStyles(styles)(Tier2Table);
