import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import LeagueTable from '../../components/tables/leagueTable';


class LeaguePage extends Component {
    render() {
        console.log("LEAGUEPROPS::",this.props);
        return (
          <div>
          <div className="g-row">
                <div className="g-col">
                  <h1>Your Rank</h1>
                  </div>
                  </div>

            <div className="g-row">
                <div className="g-col">
                <h1>League Rankings</h1>
                <br />
                <br />
                <LeagueTable />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            </div>
            </div>
        )
    }
}
export default withRouter(LeaguePage);


  