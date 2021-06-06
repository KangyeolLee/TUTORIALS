import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';

class DeleteProject extends Component {
  state = {
    userId: this.props.auth.email,
    userPassword: '',
    docId: this.props.location.projectId
  }
  handleChange = (e) => {
    this.setState({
      userPassword: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.deleteProject(this.state, this.props);
  }
  render() {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to='/signIn' />
    if(auth.uid !== this.props.location.authorId) return (
      <div className="container section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">삭제 권한이 없습니다</span>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>해당 포스트 게시자만 수정 및 삭제가 가능합니다</div>
          </div>
        </div>
      </div>
    )
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Enter your Password</h5>
          <div className="input-field">
            <label htmlFor="password">password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Delete Project</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (project, ownProps) => { dispatch(deleteProject(project, ownProps)) }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection : 'projects' }
  ])
)(DeleteProject);