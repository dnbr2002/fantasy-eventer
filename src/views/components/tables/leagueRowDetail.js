import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { firebaseDb } from '../../../firebase';

const styles = theme => ({
    root: {},
    detailContainer: {
        margin: '20px'
    },
    title: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.h3.fontSize,
    },
    head: {
        backgroundColor: theme.palette.primary.medium,
        color: theme.palette.primary.contrastText
    }
});

const HeaderCellBase = ({ classes, className, ...restProps }) => (
    <TableHeaderRow.Cell
        {...restProps}
        className={`${classes.head} ${className}`}
    />
);


const HeaderCell = withStyles(styles, { name: 'HeaderCellBase' })(HeaderCellBase);

const TeamAvatar = ({ value, style }) => (
    <Table.Cell>
        <Avatar alt="Remy Sharp" src={value} />
    </Table.Cell>
);


const Cell = (props) => {
    const { column, row } = props;
    console.log("DATA_PROP2::", props)
    if (column.name === 'pic') {
        return <TeamAvatar {...props} />;
    }
    if (column.name === 'country') {
        var imgSrc = "https://www.countryflags.io/" + row.country + "/shiny/64.png"
        var altText = "country flag - " + row.country
        return <Table.Cell> <img src={imgSrc} width="40" height="30" alt={altText} /> </Table.Cell>
    }
    return <Table.Cell {...props} />;
};

function LeagueRowDetail(props) {
    console.log("RDB10::", props.row)
    const { classes } = props;
    const [row] = useState(props.row);
    const [competitors, setCompetitors] = useState([]);
    const [team, setTeam] = useState([]);
    const [keys1] = useState(props.row.teamKeysTier1.split(','))
    const [keys2] = useState(props.row.teamKeysTier2.split(','))
    const [detailColumns] = useState([
        { name: 'country', title: 'Country' },
        { name: 'horse', title: 'Horse' },
        { name: 'rider', title: 'Rider' },
        { name: 'tier', title: 'Tier' },
        { name: 'pic', title: 'Avatar' },
        { name: 'score', title: 'Score' }
    ])
    
    useEffect(
        () => {
            firebaseDb.ref(`competitors`).once('value').then(function (snapshot) {
                setCompetitors(snapshotToArray(snapshot));
            })
        }, [])

    useEffect(
        () => {
            var teamArr = []
            console.log("RDB12.5", competitors);
            competitors.forEach((value, index) => {
                console.log("RDB12", value);
                if (keys1.concat(keys2).some(key => key === value.key))
                    teamArr.push(value);
            })
            console.log("LRD1::", teamArr);
            setTeam(teamArr);
        }, [competitors, keys1, keys2])


    function snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    };

    return (
        <div className={classes.root}>
            <div className={classes.detailContainer}>
                <div className={classes.title}>
                    Team
                    {' '}
                    {row.teamName}
                </div>
            </div>
            <Paper>
                <Grid
                    rows={team}
                    columns={detailColumns}
                >
                    <Table
                        cellComponent={Cell}
                    />
                    <TableHeaderRow
                        cellComponent={HeaderCell}
                    />
                </Grid>
            </Paper>
        </div>
    );
}

export default withStyles(styles)(LeagueRowDetail);