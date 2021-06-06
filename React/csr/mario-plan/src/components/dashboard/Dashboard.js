import React, { Component } from 'react';
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import CreateProject from '../../components/projects/CreateProject';

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props;
    console.log(projects);
    if(!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m5 offset-m1">
            <CreateProject />
            {/* <Notifications notifications={notifications}/> */}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
    // { collection: 'notifications', doc: '2KK0sfI7lXr9w1ZS5Jlh'},
    // { collection: 'notifications', doc: '2KK0sfI7lXr9w1ZS5Jlh', subcollections: [{ collection: 'subcollections_test' }]},
  ])
)(Dashboard);