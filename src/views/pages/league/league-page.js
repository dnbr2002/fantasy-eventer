import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import RgDetail from '../../components/tables/rgDetail';


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
                {/* <LeagueTable {...this.props} /> */}
                <br />
                <br />
                <RgDetail />
                <br />
                <br />
                {/* <RgTable /> */}
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


  