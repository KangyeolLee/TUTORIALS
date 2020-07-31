import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';

class ProjectDetails extends Component {
  render() {
    const { project, auth } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />

    if(project) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title"><blockquote>{ project.title }
                <Link to={{
                  pathname: '/delete',
                  projectId: `${this.props.match.params.id}`,
                  authorId: `${project.authorId}`
                }}> 
                  <i className='material-icons right black-text'>close</i>
                </Link>
                <Link to={{
                  pathname: '/update',
                  authorId: `${project.authorId}`,
                  projectId: `${this.props.match.params.id}`,
                  projectTitle: `${project.title}`,
                  projectContent: `${project.content}` }}>
                  <i className='material-icons right black-text'>create</i>
                </Link>
              </blockquote></span>
              <p>{ project.content }</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by { project.authorFirstName }, { project.authorLastName }</div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
            </div>
          </div>
        </div>
      )
    } else { 
      return (
        <div className="container center">
          <p>Loading Project...</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'projects'}
  ])
)(ProjectDetails)
