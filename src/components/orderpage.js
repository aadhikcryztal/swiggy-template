import React, { Component } from 'react'
import "../css/orderpage.css";

export default class orderpage extends Component {
  constructor(props) {
    super(props)
    {
      this.state = {
        checkbooking: 0,
        hoteldata: [
          { "id": [1, 2, 3, 4, 5] },
          { "name": ["SSN park", "MKN restaurant", "AK group of hotels", "GP hotels", "IJ parks"] },
          { "address": ["123,gandipark, ukkadam, coimabtore", "56, kabilan st, town hall, coimbatore", "kc park, race coast, coimbatore", "ktm park, ooty, coimbatore", "nehru stadium, pollachi, coimbatore"] },
          {
            "hotels": [
              {
                "menus": ["idly", "rice", "podi-roast", "choco-bar"],
                "costs": [25, 80, 45, 34]
              },
              {
                "menus": ["idly", "dhosa", "roast", "fruit mix-bar"],
                "costs": [25, 40, 44, 35]
              },
              {
                "menus": ["poori", "briyani", "roast", "choco-bar"],
                "costs": [25, 80, 43, 54]
              },
              {
                "menus": ["chappathi", "dhosa", "onion-roast", "vennila-bar"],
                "costs": [25, 35, 45, 34]
              },
              {
                "menus": ["omlet", "dhosa", "roast", "choco-bar"],
                "costs": [15, 40, 43, 30]
              }
            ]
          }
        ],
        currentselecteditems: [],
        currentselecteditemscost: [],
        closehotelmenu: 0,
        currentindex: 0,
        choosenitems: [],
        choosenitemscost: [],
        closeorder: 0
      }
    }
  }
  extendmenu = (index) => {
    console.log(this.state.hoteldata[1].name[index - 1]);
    this.setState({
      currentselecteditems: this.state.hoteldata[3].hotels[index - 1].menus,
      currentselecteditemscost: this.state.hoteldata[3].hotels[index - 1].costs,
      closehotelmenu: 1,
      currentindex: index - 1
    })
  }
  setbooking = () => {
    this.setState({ checkbooking: 1 })
  }
  backhotelmenu = () => {
    this.setState({
      closehotelmenu: 0
    })
  }
  choosenitems = (index) => {
    var choosenitems = [...this.state.choosenitems];
    var choosenitemscost = [...this.state.choosenitemscost];
    choosenitems.push(this.state.currentselecteditems[index]);
    choosenitemscost.push(this.state.currentselecteditemscost[index]);
    this.setState({
      choosenitems,
      choosenitemscost
    })

  }
  removeselecteditems = (index) => {
    var choosenitems = this.state.choosenitems;
    var choosenitemscost = this.state.choosenitemscost;
    choosenitems.splice(index, 1);
    choosenitemscost.splice(index, 1);
    this.setState({
      choosenitems,
      choosenitemscost
    })
    console.log(this.state.choosenitems)

  }
  submitorder = () => {
    console.log("cal")
    this.setState({
      closeorder: 1
    })
  }
  render() {
    var id = this.state.hoteldata[0].id;
    var hoteldata = this.state.hoteldata;
    if (this.state.choosenitemscost.length >= 1)
      var cost = this.state.choosenitemscost.reduce((cost, num) => {
        return cost + num;
      })
    return (
      <div className="orderpage">
      {
        this.state.closeorder === 1 ?  
        <button type="button" onClick={this.setbooking} className="btn btn-lg btn-block booking-btn">Thanks for purchase</button> 
        :
        this.state.closehotelmenu === 0 ?
          <button type="button" onClick={this.setbooking} className="btn btn-lg btn-block booking-btn">Start Booking</button> :
          <button type="button" onClick={this.backhotelmenu} className="btn btn-lg btn-block booking-btn">Back to Hotel menu</button>
        }
        {
          ((this.state.checkbooking === 0 && this.state.closehotelmenu === 1) || (this.state.closeorder === 1)) ? "" :
            <div className="row hotel-menu">
              {
                id.map((index) => {
                  return (
                    <div key={index} className="hotel-detail" >
                      <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                          <h5 className="card-title">{hoteldata[1].name[index - 1]}</h5>
                          <p className="card-text">{hoteldata[2].address[index - 1]}</p>
                          <button onClick={() => this.extendmenu(index)} className="btn btn-menu bg-color">Show menu</button>
                        </div>
                      </div>
                    </div>
                  )

                })
              }
            </div>
        }
        {
          (this.state.closehotelmenu === 0 || this.state.closeorder === 1) ? "" : <div>
            <div className="hotel-viewed">
              <div class="row">
                <div class="col-sm-4" style={{ borderRight: "1px solid rgb(231, 118, 12)" }}>
                  <h4 className="fontbeauty">Hotel Details: </h4>
                  <p>{this.state.hoteldata[1].name[this.state.currentindex]}</p>
                  <p>{this.state.hoteldata[2].address[this.state.currentindex]}</p>
                </div>
                <div class="col-sm-8" >
                  <div class="row">
                    <div class="col-sm-6">
                      <h4 className="fontbeauty choosenitems">Available Items..</h4>
                      <div className="list-group">
                        {
                          this.state.currentselecteditems.map((item, index) =>
                            <a key={index} onClick={() => this.choosenitems(index)} className="list-group-item list-group-item-action">{item}
                              <span className="badge badge-pill bg-colour" style={{ float: "right", color: "rgb(231, 118, 12)" }}>{this.state.currentselecteditemscost[index]} Rs</span>
                            </a>)
                        }
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <h4 className="fontbeauty selecteditems">Selected Items..</h4>
                      <div className="list-group">
                        {
                          this.state.choosenitems.map((item, index) =>
                            <a key={index} className="list-group-item list-group-item-action selected-items">
                              <span className="row">
                                <span className="col">{item} <br />
                                  <span className="badge badge-pill bg-colour" style={{ color: "rgb(231, 118, 12)" }}> {this.state.choosenitemscost[index]} Rs</span>
                                </span>
                                <span className="col">
                                  <span onClick={() => this.removeselecteditems(index)} className="badge badge-pill bg-colour" style={{ float: "right", color: "rgb(231, 118, 12)" }}>X</span>
                                </span>
                              </span>
                            </a>)

                        }
                        <div className="alert alert-info bg-color" style={{ color: "#fff" }} role="alert">
                          Total : {cost} Rs.
                          </div>
                        {
                          this.state.choosenitems.length === 0 ? "" :
                            <button type="button" onClick={this.submitorder} className="btn btn-lg btn-block bg-color">Finish Order</button>
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        }
        {
          this.state.closeorder === 0 ? "" :
              <div className="billing">
                <h4 className="fontbeauty selecteditems">Your items</h4>
                <div className="list-group">
                  {
                    this.state.choosenitems.map((item, index) =>
                      <a key={index} className="list-group-item list-group-item-action selected-items">
                        <span className="row">
                          <span className="col">{item} <br />
                            <span className="badge badge-pill bg-colour" style={{ color: "rgb(231, 118, 12)" }}> {this.state.choosenitemscost[index]} Rs</span>
                          </span>
                        </span>
                      </a>)

                  }
                  <div className="alert alert-info bg-color" style={{ color: "#fff" }} role="alert">
                    Total : {cost} Rs.
                          </div>
                  {
                    (this.state.choosenitems.length === 0 || this.state.closeorder === 1)? "" :
                      <button type="button" onClick={this.submitorder} className="btn btn-lg btn-block bg-color">Finish Order</button>
                  }

                </div>
              </div>
        }
      </div>
    )

  }

}