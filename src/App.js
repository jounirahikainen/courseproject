import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="blue lighten-1 z-depth-2" role="navigation">
            <div className="nav-wrapper container">
              <a id="logo_container" className="brand_logo" href="Home">Inspire</a>
              <ul className="right">
                <li>
                  <a id="Login_status1">Not logged in</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <br />
          <br />
          <div className="row flex z-depth-2">
            <div className="purple lighten-1 col s4 m4">
              <div className="input-field">
                <input id="login_name" type="text" placeholder="" />
                <label htmlFor="login_name">Account name</label>
              </div>
              <div className="input-field">
                <input id="login_password" type="password" placeholder=""></input>
                <label htmlFor="login_password">Password</label>
              </div>
              <div className="input-field">
                <input
                  type="button"
                  id="Login_button"
                  value="Login"
                  className="btn waves-effect waves-light btn-small light-blue"
                />
                <input
                  type="button"
                  id="Logout_button"
                  value="Logout"
                  className="btn waves-effect waves-light btn-small light-blue"
                />
              </div>
            </div>

            <div className="col s8 m8 white">
              <div className="input-field">
                <input id="new_post" type="text" placeholder=""/>
                <label htmlFor="new_post">Share your ideas</label>
                <input
                  type="button"
                  id="send_button"
                  value="Send"
                  className="btn waves-effect waves-light btn-small light-blue btn"
                />
              </div>
              <br />
              <div className="divider"></div>
              <br />
              <div className="row no-margin-bottom">
                <div className="center col s12 blue lighten-1">
                  <h5>
                    Feed
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div id="Login_status2" className="col s4 z-depth-2 green">Not logged in</div>
            <div id="post_feed" className="col s8 z-depth-2 white textcontrol"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
