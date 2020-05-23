import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class VendorView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pdt: [],
            username: this.props.location.username,
            vendor_id: this.props.location.vendor_id
        }
    }

    Waitview = () => {
        this.props.history.push({
            pathname: "/login/vendor/:username/view/waitview",
            username: this.state.username,
            vendor_id: this.state.vendor_id
        });
    }

    Readyview = () => {
        this.props.history.push({
            pathname: "/login/vendor/:username/view/readyview",
            username: this.state.username,
            vendor_id: this.state.vendor_id
        });
    }

    Dispatchedview = () => {
        this.props.history.push({
            pathname: "/login/vendor/:username/view/dispatchedview",
            username: this.state.username,
            vendor_id: this.state.vendor_id
        });
    }

    Cancelledview = () => {
        this.props.history.push({
            pathname: "/login/vendor/:username/view/cancelledview",
            username: this.state.username,
            vendor_id: this.state.vendor_id
        });
    }

    Vendorview = () => {
        this.props.history.push({
            pathname: "/login/vendor/:username/view",
            username: this.state.username,
            vendor_id: this.state.vendor_id
        });
    }

    Vendoradd = () => {
        this.props.history.push({
            pathname: "/login/vendor/:username/add",
            username: this.state.username,
            vendor_id: this.state.vendor_id
        });
    }



    render() {
        return (
            <div>
            <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                          <li className="navbar-item">
                            <button type="button" onClick={this.Vendorview} className="btn btn-primary">View Products</button>     
                          </li>
                          <li className="navbar-item">
                            <button type="button" onClick={this.Vendoradd} className="btn btn-primary">Add Products</button>        
                          </li>
                        </ul>
                      </div>
                    </nav>
            </div>


            <button type="button" onClick={this.Waitview} className="btn btn-primary">View Waiting Products</button>
            <button type="button" onClick={this.Readyview} className="btn btn-primary" >View Ready to Dispatch Products</button>
            <button type="button" onClick={this.Dispatchedview} className="btn btn-primary" >View Dispatched Products</button>
            <button type="button" onClick={this.Cancelledview} className="btn btn-primary" >View Cancelled Products</button>
            </div>
        )
    }
}
