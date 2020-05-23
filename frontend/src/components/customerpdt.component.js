import React, {Component} from 'react';
import axios from 'axios';

export default class CustomerPdt extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username : this.props.location.username,
            cust_id: this.props.location.cust_id,
            pdtname : this.props.location.pdtname,
            spdt: []
        }
    }

    componentDidMount() {

        const SearchProduct = {
            pdtname: this.state.pdtname
        }

        axios.post('http://localhost:4000/searchpdt',SearchProduct)
             .then(response => {
                 this.setState({spdt: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    Order = (i) => {
        console.log(this.state.spdt.map((currentSpdt,i) => currentSpdt.username)[i]);
        this.props.history.push({
            pathname: "/login/customer/:username/search/pdt/order",
            cust_id: this.state.cust_id,
            pdtname: this.state.pdtname,
            username: this.state.username,
            pdtowner: this.state.spdt.map((currentSpdt,i) => currentSpdt.username)[i]
        });
    }

    ViewPdt = () => {
        this.props.history.push({
            pathname: "/login/customer/:username/view",
            username: this.state.username,
            cust_id: this.state.cust_id
        });
    }   

    SearchPdt = () => {
        this.props.history.push({
            pathname: "/login/customer/:username/search",
            username: this.state.username,
            cust_id: this.state.cust_id
        });
    }   

	SortPrice=()=>{

          let sortedProductsAsc;
          sortedProductsAsc= this.state.spdt.sort((a,b)=>{
             return parseInt(a.price)  - parseInt(b.price);
          })

          this.setState({
              spdt:sortedProductsAsc
          })
      }

	SortQuantity=()=>{

          let sortedProductsAsc;
          sortedProductsAsc= this.state.spdt.sort((a,b)=>{
             return parseInt(a.quantity-a.totcnt)  - parseInt(b.quantity- b.totcnt);
          })

          this.setState({
              spdt:sortedProductsAsc
          })
      }

	SortRating=()=>{

          let sortedProductsAsc;
          sortedProductsAsc= this.state.spdt.sort((a,b)=>{
             return parseInt(a.rating/a.totreviews)  - parseInt(b.rating/b.totreviews);
          })

          this.setState({
              spdt:sortedProductsAsc
          })
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

            <br/>
            <button type="button" onClick={this.SortPrice} className="btn btn-primary">Sort By Price</button>
            <button type="button" onClick={this.SortQuantity} className="btn btn-primary">Sort By Quantity Left</button>
            <button type="button" onClick={this.SortRating} className="btn btn-primary">Sort By Rating</button>
            <br/>
            <br/>
            </div>


                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity Left To Be Ordered</th>
                            <th>Average Rating</th>
                            <th>Reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.spdt.map((currentSpdt, i) => {
                            return (
                                <tr>
                                    <td>{currentSpdt.username}</td>
                                    <td>{currentSpdt.pdtname}</td>
                                    <td>{currentSpdt.price}</td>
                                    <td>{Number(currentSpdt.quantity)-Number(currentSpdt.totcnt)}</td>
                                    <td>{currentSpdt.rating/currentSpdt.totreviews}</td>
                                    <td>{currentSpdt.reviews}</td>
                                    <td><button type="button" onClick={() => this.Order(i)} className="btn btn-primary">Order</button></td>
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
