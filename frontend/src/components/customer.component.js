import React, {Component} from 'react';
import axios from 'axios';

export default class Customer extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.username,
            cust_id: this.props.location.cust_id
        }
    }
    
    ViewPdt= () => {
        this.props.history.push({
            pathname: "/login/customer/:username/view",
            username: this.state.username,
            cust_id: this.state.cust_id
        });
    }   

    SearchPdt= () => {
        this.props.history.push({
            pathname: "/login/customer/:username/search",
            username: this.state.username,
            cust_id: this.state.cust_id
        });
    }   

    render() {
        return (
            <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                          <li className="navbar-item">
                            <button type="button" onClick={this.ViewPdt} className="btn btn-primary">View Your Cart</button>
                          </li>
                          <li className="navbar-item">
                            <button type="button" onClick={this.SearchPdt} className="btn btn-primary" >Search New Products</button>
                          </li>
                        </ul>
                      </div>
                    </nav>
            </div>
        )
    }
}



