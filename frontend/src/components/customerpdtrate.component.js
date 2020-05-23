import React, {Component} from 'react';
import axios from 'axios';

export default class PdtRateReview extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.username,
            cust_id: this.props.location.cust_id,
            pdtname: this.props.location.pdtname,
            pdtowner: this.props.location.pdtowner,
            pdtrating: 1, 
            review: '',
            temppdtrating: 1, 
            tempreview: '',
            pdttotreviews: 0,
            temppdttotreviews: 0
        }

        this.onChangeRatepdt= this.onChangeRatepdt.bind(this);
        this.onChangeReview= this.onChangeReview.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeRatepdt(event) {
        this.setState({ pdtrating: event.target.value });
    }
    
    onChangeReview(event) {
        this.setState({ review: event.target.value });
    }
    
    onSubmit(e) {
        e.preventDefault();

        const FindPdtRevTot = {
            username: this.state.username,
            pdtname: this.state.pdtname,
            pdtowner: this.state.pdtowner
        }

        axios.post('http://localhost:4000/findtotpdtratingreview', FindPdtRevTot)
            .then(res => {
                console.log(res.data);
                this.setState({temppdtrating: res.data.pdtrating, tempreview: res.data.reviews, temppdttotreviews: res.data.pdttotreviews})

                    const RatePdt = {
                        username: this.state.username,
                        pdtname: this.state.pdtname,
                        pdtowner: this.state.pdtowner,
                        pdtrating: (Number(this.state.pdtrating) + Number(this.state.temppdtrating)),
                        review: this.state.tempreview + "," + this.state.review,
                        pdttotreviews: Number(this.state.temppdttotreviews) + 1
                    }

                console.log(this.state.tempreview);
                console.log(this.state.review);
                axios.put('http://localhost:4000/pdtratingreview', RatePdt)
                    .then(res => console.log(res.data));

                this.setState({
                    username: this.state.username,
                    pdtname: this.state.pdtname,
                    pdtowner: this.state.pdtowner,
                    pdtrating: 1,
                    review: "",
                    pdttotreview: 0

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
                        <label>Rate Product </label>
                        <select type="text"
                               className="form-control"
                               value={this.state.ratepdt}
                               onChange={this.onChangeRatepdt}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
    
                    <div className="form-group">
                        <label>Review Product </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.review}
                               onChange={this.onChangeReview}
                               />  
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit Response" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
