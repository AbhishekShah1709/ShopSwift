import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class VendorReadyView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pdt: [], 
            username: this.props.location.username,
            vendor_id: this.props.location.vendor_id
        }
    }

    componentDidMount() {

        const SpecVend = {
            username: this.state.username
        }

        axios.post(`http://localhost:4000/viewreadypdt/:${this.state.username}`,SpecVend)
             .then(response => {
                 this.setState({pdt: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })

    }

    Dispatch = (i) => {

        const FindProduct = {
            username: this.state.username,
            pdtname: this.state.pdt.map((currentPdt,i) => currentPdt.pdtname)[i],
            stat: 3
        }

        axios.put('http://localhost:4000/dispatchorder',FindProduct)
            .then(response => {
                 console.log(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })

        axios.put('http://localhost:4000/dispatch',FindProduct)
            .then(response => {
                console.log(response.data);
                this.setState({pdt: []});

                const SpecVend = {
                    username: this.state.username
                }

                axios.post(`http://localhost:4000/viewreadypdt/:${this.state.username}`,SpecVend)
                    .then(response => {
                        this.setState({pdt: response.data});
                        this.location.reload();
                    })
                .catch(function(error) {
                    console.log(error);
                })
            })  
        .catch(function(error) {
            console.log(error);
        })  

        alert("Product Dispatched")
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


                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Product Name</th>
                            <th>Status</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.pdt.map((currentPdt, i) => {
                            return (
                                <tr>
                                    <td>{currentPdt.username}</td>
                                    <td>{currentPdt.pdtname}</td>
                                    <td>Ready To Dispatch</td>
                                    <td>{currentPdt.quantity}</td>
                                    <td><button type="button" onClick={() => this.Dispatch(i)} className="btn btn-primary">Dispatch</button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
