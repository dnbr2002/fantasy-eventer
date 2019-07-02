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
    const { column, row } = props;
    console.log("DATA_PROP2::", props)
    if (column.name === 'pic') {
        return <TeamAvatar {...props} />;
    }
    if (column.name === 'country') {
        var imgSrc = "https://www.countryflags.io/"+ row.country +"/shiny/64.png"
        var altText = "country flag - " + row.country 
        return <Table.Cell> <img src={imgSrc} width="40" height="30" alt={altText} /> </Table.Cell>
    }
    return <Table.Cell {...props} />;
};

function LeagueRowDetail(props) {
    console.log("RDB10::", props)
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
            console.log("RDB14", teamArr);
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
        <div>
            <div className={classes.detailContainer}>
                <h5 className={classes.title}>
                    {row.teamName}
                    {' '}
                    Team
                </h5>
            </div>
            <Paper>
                <Grid
                    rows={team}
                    columns={detailColumns}
                >
                    <Table
                    cellComponent={Cell}
                    />
                    <TableHeaderRow />
                </Grid>
            </Paper>
        </div>
    );
}

export default withStyles(styles)(LeagueRowDetail);