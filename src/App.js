import React, { Component } from 'react'
import Titlepage from "./components/titlepage";
import Orderpage from "./components/orderpage";
import Login from "./components/login";
export default class App extends Component {
  constructor(props) {
    super(props)
    {
      this.state = {
        loginaccess: 0
      }
    }
  }
  login = () =>
  {
    this.setState({loginaccess:1})
  }
  render() {
    return (
      <div>
        <Titlepage />
        {
          this.state.loginaccess === 0 ? <Login login={this.login} /> :
            <div>
              <Orderpage />
            </div>

        }
      </div>
    )
  }
}
