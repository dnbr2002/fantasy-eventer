/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LeagueTable from '../../components/tables/leagueTable'
import RgTable from '../../components/tables/rgTable';
import RgDetail from '../../components/tables/rgDetail';
import * as leagueActions from '../../../actions/leagueActions';
import { LeagueSelector } from '../../../selectors/leagueSelector';

class LeaguePage extends Component {
    static propTypes = {
        loadLeague: PropTypes.func.isRequired,    
      }
      constructor(props) {
        super(props)
        this.state = {
            shouldUpdate: false, 
        };
    }

    shouldComponentUpdate(nextProps) {
          if (this.props != nextProps) {
            this.setState({shouldUpdate: true});
          }
          
      }

    componentWillMount() {
        this.props.loadLeague();
      }

    render() {
        console.log("LEAGUEPROPS::",this.props);
        return (
            <div className="g-row">
                <div className="g-col">
                <h1>LeaguePage</h1>
                {/* <LeagueTable {...this.props} /> */}
                <br />
                <br />
                <RgDetail {...this.props}  />
                <br />
                <br />
                {/* <RgTable /> */}
                <br />
                <br />
                <br />
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("MYSTATE::",state)
    return {
        league: LeagueSelector(state),
    }
  }
  
  
const mapDispatchToProps = Object.assign(
    {},
    leagueActions
  );
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaguePage));


  