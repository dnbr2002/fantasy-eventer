import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PhotoWall from '../../components/photos/photoWall';
import AddPhoto from '../../components/photos/addPhoto';
import { bindActionCreators } from 'redux';
import * as adminActions from '../../../actions/adminActions'
// import { authActions } from 'src/auth';  //get auth role as admin
// import Button from 'src/views/components/button';

import './admin-page.css';

export class AdminPage extends Component {
    // componentWillReceiveProps(nextProps){
    //     if(this.state.posts !)
    // }


    render() {
        console.log("ADMINPAGECOMPPROP::",this.props.actions.addCompetitor)
        console.log("ADMINSTATE::", this.props.posts);
        return (
            <div>
            <h1>AdminPage</h1>
            <PhotoWall {...this.props} />
            <AddPhoto {...this.props} />
            
            </div>
        );
    }
}

AdminPage.propTypes = {
    posts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------
function mapStateToProps(state) {
    return {
        posts: state.admin
    }
}

function mapDispatchToProps(dispatch) {
    return{
        actions: bindActionCreators(adminActions, dispatch)
    }

};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AdminPage)
);
