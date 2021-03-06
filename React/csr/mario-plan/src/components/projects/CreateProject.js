import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';

class CreateProject extends Component {
  state = {
    title: '',
    content: '',
    video: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state);
    // this.props.history.push('/');
  }
  handleUpload =(e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let target_id = e.target.id;

    this.setState({
      [target_id]: file,
    })
  }
  render() {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />

    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create new Project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id='title' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <input type="file" id='video' className='file-uploader' onChange={this.handleUpload} accept="video/*" />
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">create</button>
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth         // firestore DB에 저장된 값은 아니므로 firestoreConnect 함수 X
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    //deletePost: (id) => { dispatch({type: 'DELETE_POST', id:id}) }
    createProject: (project) => { dispatch(createProject(project)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
