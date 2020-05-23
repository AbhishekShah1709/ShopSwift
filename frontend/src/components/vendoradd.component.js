import React, {Component} from 'react';
import axios from 'axios';

export default class VendorAdd extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.username,
            vendor_id: this.props.location.vendor_id,
            pdtname: '',
            price: '',
            quantity: '',
        }

        this.onChangePdtname= this.onChangePdtname.bind(this);
        this.onChangePrice= this.onChangePrice.bind(this);
        this.onChangeQuantity= this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangePdtname(event) {
        this.setState({ pdtname: event.target.value });
    }
    
    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }

    onChangeQuantity(event) {
        this.setState({ quantity: event.target.value });
    }
    
    onSubmit(e) {
        e.preventDefault();
    
        const NewProduct = {
            username: this.state.username,
            pdtname: this.state.pdtname,
            price: this.state.price,
            quantity:this.state.quantity, 
            totcnt:0,
            pdtstatus:"Waiting",
            rating:0,
            totreviews:0,
            pdtrating:0,
            reviews: "",
            pdttotreviews: 0
        }
    
        axios.post('http://localhost:4000/addpdt', NewProduct)
             .then(res => console.log(res.data));

        this.setState({
            pdtname: '',
            price: '',
            quantity: ''
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

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.pdtname}
                               onChange={this.onChangePdtname}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.price}
                               onChange={this.onChangePrice}
                               />
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.quantity}
                               onChange={this.onChangeQuantity}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
