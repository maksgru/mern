import React, { Component } from "react";
import Fetch from "../controllers/Fetch";

const request = new Fetch();



export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.formHandler = this.formHandler.bind(this);
    this.auth = this.auth.bind(this);
  }

  formHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async auth() {
    const {email, password} = this.state; 
    const params = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    }
    const data = await request.fetchPost('/api/auth/login', params);
    localStorage.setItem("token", data.token)
  }

  render() {
    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
              <b>Jobs</b>Purifier
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              {/* <form action="../../index3.html" method="post"> */}
                <div className="input-group mb-3">
                  <input
                  name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={this.formHandler}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                  name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={this.formHandler}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">Remember Me</label>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-4">
                    <button type="submit" onClick={e => this.auth(e)} className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              {/* </form> */}
              {/* /.social-auth-links */}
              <p className="mb-1">
                <a href="forgot-password.html">I forgot my password</a>
              </p>
              <p className="mb-0">
                <a href="register.html" className="text-center">
                  Register a new membership
                </a>
              </p>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    );
  }
}
