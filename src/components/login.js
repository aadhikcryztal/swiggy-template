import React, { Component } from 'react';
import '../css/login.css';
import axios from 'axios';
export default class login extends Component {
    constructor(props)
    {
        super(props)
        {
            this.state = {
                logindata : [],
            }
        }
    }
    async componentWillMount() {
        const logindata = await axios.get("https://my-json-server.typicode.com/aadhikcryztal/fusiondata/logindetails");
        console.log(logindata.data);
        this.setState({logindata : logindata.data})
      }
      logincheck = (e) =>
      {
          e.preventDefault()
          this.props.login();
      }
    render() {
        return (
            <div className="login-page">
            <p className="login-title">Login Form</p>
                <form onSubmit ={this.logincheck}>
                    <div className ="form-row">
                        <div className ="form-group col-md-6">
                            <label className="label" >Email</label>
                            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                        </div>
                        <div className ="form-group col-md-6">
                            <label className="label" >Password</label>
                            <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-block login-btn">LOG IN</button>
                </form>
            </div>
        )
    }
}
