import React, {Component} from 'react';
import axios from 'axios';

export default class CustomerSearch extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.username, 
            cust_id: this.props.location.cust_id,
            pdtname: ''
        }

        this.onChangespdtname = this.onChangespdtname.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangespdtname(event) {
        this.setState({ pdtname: event.target.value });
    }
    
    onSubmit(e) {
        e.preventDefault();

        const SearchProduct = {
            pdtname: this.state.pdtname
        }

//        axios.post('http://localhost:4000/searchpdt', SearchProduct)
//             .then(res => {
        this.props.history.push({
            pathname : "/login/customer/:username/search/pdt",
            cust_id: this.state.cust_id,
            pdtname : this.state.pdtname,
            username: this.state.username
        });
//                 console.log(res.data)
//             });

        this.setState({
            pdtname: ''
        });
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

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Search Product Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.pdtname}
                               onChange={this.onChangespdtname}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
