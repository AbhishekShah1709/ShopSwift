import React, {Component} from 'react';
import axios from 'axios';

export default class CustomerRate extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.username,
            cust_id: this.props.location.cust_id,
            pdtname: this.props.location.pdtname,
            pdtowner: this.props.location.pdtowner,
            rating: 1,
            temprating: 0,
            totreviews: 0,
            temptotreviews: 0 
        }

        this.onChangeRating = this.onChangeRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeRating(event) {
        this.setState({ rating: event.target.value});
    }
    
    onSubmit(e) {
        e.preventDefault();

        console.log(this.state.rating)

        const FindOwner = {
            pdtowner: this.state.pdtowner
        }

        axios.post('http://localhost:4000/getrating',FindOwner)
            .then(res => {
                console.log(res.data);
                this.setState({temprating: res.data.rating, temptotreviews: res.data.totreviews})

                    const RateOwner = {
                        username: this.state.username,
                        pdtname: this.state.pdtname,
                        pdtowner: this.state.pdtowner,
                        rating: Number(this.state.temprating)+Number(this.state.rating),
                        totreviews: Number(this.state.temptotreviews)+1
                    }
                    
                    axios.put('http://localhost:4000/rating', RateOwner)
                    .then(res => console.log(res.data));

                this.setState({
                    username: this.state.username,
                    pdtname: this.state.pdtname,
                    pdtowner: this.state.pdtowner,
                    rating: 1,
                    totreviews: 0
                });
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
                        <label>Select Rating: </label>
                        <select type="text"
                               className="form-control"
                               value={this.state.rating}
                               onChange={this.onChangeRating}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Rate Vendor" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
