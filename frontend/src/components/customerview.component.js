import React, {Component} from 'react';
import axios from 'axios';

export default class CustomerCart extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            username: this.props.location.username,
            cust_id: this.props.location.cust_id
        }
    }

    componentDidMount() {
        
        const CustomerName = {
            username: this.state.username
        }

        axios.post('http://localhost:4000/cart', CustomerName)
             .then(response => {
                 this.setState({orders: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    RateReview = (i) => {
        if(this.state.orders.map((currentOrder,i) => currentOrder.pdtstatus)[i] === "Waiting")
            alert("Product Not Yet Dispatched")
        else if(this.state.orders.map((currentOrder,i) => currentOrder.pdtstatus)[i] === "Ready To Dispatch")
            alert("Product Not Yet Dispatched")
        else if(this.state.orders.map((currentOrder,i) => currentOrder.pdtstatus)[i] === "Cancelled")
            alert("Product Has Been Cancelled")
        else
        {
            console.log(this.state.orders.map((currentOrder,i) => currentOrder.pdtname)[i])
                this.props.history.push({
                    pathname: '/login/customer/:username/view/pdtratereview',
                    username: this.state.username,
                    cust_id: this.state.cust_id,
                    pdtname: this.state.orders.map((currentOrder,i) => currentOrder.pdtname)[i],
                    pdtowner: this.state.orders.map((currentOrder,i) => currentOrder.pdtowner)[i]
                });
        }
    }

    Edit = (i) => {
        if(this.state.orders.map((currentOrder,i) => currentOrder.pdtstatus)[i] === "Dispatched")
            alert("Product Already Dispatched")
        else if(this.state.orders.map((currentOrder,i) => currentOrder.pdtstatus)[i] === "Cancelled")
            alert("Product Has Been Cancelled")
        else
        {
            console.log(this.state.orders.map((currentOrder,i) => currentOrder.pdtname)[i])
                this.props.history.push({
                    pathname: '/login/customer/:username/view/edit',
                    username: this.state.username,
                    cust_id: this.state.cust_id,
                    pdtname: this.state.orders.map((currentOrder,i) => currentOrder.pdtname)[i],
                    pdtowner: this.state.orders.map((currentOrder,i) => currentOrder.pdtowner)[i]
                });
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
            <div>
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

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Owner</th>
                            <th>Product Name</th>
                            <th>Product Status</th>
                            <th>Quantity Left To Be Ordered</th>
                            <th>Edit</th>
                            <th>Rate and Review</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.orders.map((currentOrder, i) => {
                            return (
                                <tr>
                                    <td>{currentOrder.pdtowner}</td>
                                    <td>{currentOrder.pdtname}</td>
                                    <td>{currentOrder.pdtstatus}</td>
                                    <td>{(currentOrder.quantity - currentOrder.totcnt)}</td>
                                    <td><button type="button" onClick={() => this.Edit(i)} className="btn btn-primary">Edit Order</button> </td>
                                    <td><button type="button" onClick={() => this.RateReview(i)} className="btn btn-primary">Rate & Review</button> </td>
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
