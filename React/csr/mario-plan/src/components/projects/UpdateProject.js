import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { updateProject } from '../../store/actions/projectActions';


class UpdateProject extends Component {
  state = {
    title: this.props.location.projectTitle,
    content: this.props.location.projectContent,
    docId: this.props.location.projectId
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateProject(this.state);
    this.props.history.push('/');
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  render() {
    const { auth, project } = this.props;
    const checkActiveLabel = this.state ? 'active' : null;

    if(!auth.uid) return <Redirect to='/signin' />  
    if(auth.uid === project.authorId) {
      return (
        <div className='container'>
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Update this Project</h5>
            <div className="input-field">
              <label className={checkActiveLabel} htmlFor="title">Title</label>
              <input type="text" id='title' onChange={this.handleChange} value={this.state.title}/>
            </div>
            <div className="input-field">
              <label className={checkActiveLabel} htmlFor="content">Project Content</label>
              <textarea id="content" className="materialize-textarea" onChange={this.handleChange} value={this.state.content}></textarea>
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Update</button>
            </div>
          </form>
        </div>
      )
    } else {
      return (
        <div className="container section">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">수정 권한이 없습니다</span>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>해당 포스트 게시자만 수정 및 삭제가 가능합니다</div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.location.projectId;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    auth: state.firebase.auth,
    project
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProject: (project) => { dispatch(updateProject(project)) }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'projects'}
  ])
)(UpdateProject);