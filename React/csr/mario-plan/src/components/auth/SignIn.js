import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authAction';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }
  render() {
    const { authError, auth } = this.props;
    if(auth.uid) return <Redirect to='/' />

    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Log In</button>
            <div className="red-text center">{ authError ? <p>{authError}</p> : null }</div>
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {      
  return {    // store에 저장된 값만 Props로 담아와서 사용할 것 인지
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {    
  return {    // store에 삭제, 추가와 같은 별도의 action을 Props로 담아와서 dispatch 할 것 인지
    signIn: (creds) => dispatch(signIn(creds))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
