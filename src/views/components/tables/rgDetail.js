import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as leagueActions from '../../../actions/leagueActions';
import { LeagueSelector } from '../../../selectors/leagueSelector';
import Paper from '@material-ui/core/Paper';
import button from '@material-ui/core/Button';
import {
    RowDetailState,
    SortingState,
    IntegratedSorting,
    PagingState,
    IntegratedPaging,
    SelectionState,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel
} from '@devexpress/dx-react-grid-material-ui';

import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { promised } from 'q';


const styles = theme => ({
    detailContainer: {
        margin: '20px',
    },
    title: {
        color: theme.palette.text.primary,
        fontSize: theme.typography.fontSize,
    },
});

const detailColumns = [
    { name: 'subject', title: 'Subject' },
    { name: 'startDate', title: 'Start Date' },
    { name: 'dueDate', title: 'Due Date' },
    { name: 'priority', title: 'Priority' },
    { name: 'status', title: 'Status' },
];
const tableDetailColumnExtensions = [
    { columnName: 'startDate', width: 115 },
    { columnName: 'dueDate', width: 115 },
    { columnName: 'priority', width: 100 },
    { columnName: 'status', width: 125 },
];

const data = [{
    subject: 'mark',
    startDate: 'now',
    dueDate: 'later',
    priority: 'high',
    status: 'incomplete'
},
{
    subject: 'mark',
    startDate: 'now',
    dueDate: 'later',
    priority: 'high',
    status: 'incomplete'
}]

// const useStyles = makeStyles({
//     avatar: {
//       margin: 10,
//     },
//     bigAvatar: {
//       margin: 10,
//       width: 60,
//       height: 60,
//     },
//   });

let RowDetailBase = ({ row, classes }) => (
    <div className={classes.detailContainer}>
        <div>
            <h5 className={classes.title}>
                {row.name}
                {' '}
                Team
    </h5>
        </div>
        <Paper>
            <Grid
                rows={data}
                columns={detailColumns}
            >
                <Table
                    columnExtensions={tableDetailColumnExtensions}
                />
                <TableHeaderRow />
            </Grid>
        </Paper>
    </div>
);

const RowDetail = withStyles(styles)(RowDetailBase);

const TeamAvatar = ({ value, style, ...restProps }) => (
    <Table.Cell>
        <Avatar alt="Remy Sharp" src={value} />
    </Table.Cell>
);


const Cell = (props) => {
    const { column } = props;
    // console.log("DATA_PROP2::", props)
    if (column.name === 'profilePic') {
        return <TeamAvatar {...props} />;
    }
    return <Table.Cell {...props} />;
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1,
            columns: [
                { name: 'teamName', title: 'Team' },
                { name: 'profilePic', title: 'Avatar' },
                { name: 'score', title: 'Score' },
                { name: 'profileName', title: 'profileName' },
                { name: 'id', title: 'ID', getCellValue: this.getCount() }
            ],

            rows: this.props.league,
            pageSizes: [5, 10, 15],
            currentPage: 0,
            loading: true,
        };
        this.getCount = this.getCount.bind(this)
    }

    getCount () {
        console.log("COUNTER::", this.state.counter)
        if(this.state.counter)
        this.setState({counter: this.state.counter++}, console.log("COUNTER1::", this.state.counter))
    }
    componentWillMount() {
        this.props.loadLeague();
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("CWP:", nextProps.league + "----" + this.props.league);
    //     var promise = new Promise((resolve, reject) => {
    //     if (nextProps.league !== this.props.leage) {
    //         resolve(nextProps.league)            
    //     }
    //     else reject()
    // });
    // let counter = 0;
    // promise.then(result => {
    //     console.log("XX::",result)
    //    return result.sort((a,b) => a.score > b.score ? 1 : -1)
    // }).then(result => {
    //         console.log("XX1::",result)
    //         result.map(x => 
    //             this.setState({rows: })
    //             console.log("XX2::",x))
    //     })
    
    // }
    // this.setState({ rows: nextProps.league })

    componentWillReceiveProps(nextProps) {
        console.log("CWP:", nextProps.league + "----" + this.props.league);
        if (nextProps.league !== this.props.leage) {
            this.setState({ rows: nextProps.league })
    
    }
}

    render() {
        const { columns, rows } = this.state;
        const { league } = this.props;
        console.log("DATA_STATE::", this.state)

        console.log("DATA_PROP::", league)

        return (
            <div>
                <Paper>
                    <Grid
                        rows={rows}
                        columns={columns}
                        counter={this.counter}
                    >
                        <SortingState
                            defaultSorting={[{ columnName: 'score', direction: 'asc' }]}
                        />
                        <IntegratedSorting />
                        <PagingState
                            defaultCurrentPage={0}
                            pageSize={5}
                        />
                        {/* <RowDetailState /> */}
                        <IntegratedPaging />
                        <Table
                            cellComponent={Cell}
                        />
                        <TableHeaderRow />
                        {/* <TableRowDetail
                        contentComponent={RowDetail}
                    /> */}
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
    }
}

const mapDispatchToProps = Object.assign(
    {},
    leagueActions
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Demo));