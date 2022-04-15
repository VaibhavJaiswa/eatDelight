import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import cookie from 'react-cookies'
import { useNavigate } from 'react-router-dom'




const CLIENT_ID =
  "579496129302-q2fngq18mr5bp8k3jjq0t5tf0toj9b9j.apps.googleusercontent.com";

class GoogleLoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        firstName: "",
        lastName:"",
        emailId: "",
        profile:"",

      },
    };
  }

  // Success Handler
  responseGoogleSuccess = (response) => {
    console.log(response);
    let userInfo = {
      firstName: response.profileObj.givenName,
      emailId: response.profileObj.email,
      url:response.profileObj.imageUrl
    };
    
    cookie.save('Name', userInfo.firstName, { path: '/' })
    cookie.save('LogedIn','true',{path:'/'})
    cookie.save('url',userInfo.url,{path:'/'})
        
    this.setState({ userInfo, isLoggedIn: true });
  };

  // Error Handler
  responseGoogleError = (response) => {
    console.log(response);
  };

  // Logout Session and Update State
  logout = (response) => {
    console.log(response);
    let userInfo = {
      name: "",
      emailId: "",
    };
    this.setState({ userInfo, isLoggedIn: false });
  };

  render() {
    return (
      <div className="row mt-3">
        <div className="col-md-12">
          {this.state.isLoggedIn ? (
            <div>
              <GoogleLogout
                clientId={CLIENT_ID}
                buttonText={"Logout"}
                onLogoutSuccess={this.logout}
                theme="dark"
                className="fbBtn"
              ></GoogleLogout>
            </div>
          ) : (
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Continue with Google"
              onSuccess={this.responseGoogleSuccess}
              onFailure={this.responseGoogleError}
              isSignedIn={false}
              theme="dark"
              className="fbBtn"
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
      </div>
    );
  }
}
export default GoogleLoginComponent;