import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';
import Paper from "@material-ui/core/Paper";
import Avatar from '@material-ui/core/Avatar';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, name, calories, fat, carbs, protein };
// }


class LeagueTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 2
  }

  render() {
    const { classes } = this.props;
    console.log("LEAGUETABLEPROPS::", this.props)
    console.log("LTV::",this.props.league.values())

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell numeric>Rank</CustomTableCell>
                <CustomTableCell>Team</CustomTableCell>
                <CustomTableCell>UserName</CustomTableCell>
                <CustomTableCell>Avatar</CustomTableCell>
                <CustomTableCell numeric>Score</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.league.map((team, i) => {
                return (
                  <TableRow className={classes.row} key={i}>
                    <CustomTableCell numeric>{team.profile.score}</CustomTableCell>
                    <CustomTableCell component="th" scope="row">{team.profile.teamName}</CustomTableCell>
                    <CustomTableCell>{team.profile.profileName}</CustomTableCell>
                    <CustomTableCell>
                      <Avatar
                        alt={team.profile.teamName}
                        src={team.profile.profilePic}
                      />
                    </CustomTableCell>
                    <CustomTableCell numeric>{team.profile.score}</CustomTableCell>
                  </TableRow>
                );
              })}</TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={this.props.league.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

LeagueTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LeagueTable);
