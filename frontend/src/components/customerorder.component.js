import React, {Component} from 'react';
import axios from 'axios';

export default class CustomerOrder extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            pdtname: this.props.location.pdtname,
            cust_id: this.props.location.cust_id,
            pdtowner: this.props.location.pdtowner,
            username: this.props.location.username,
            cnt: '',
            pdtstat:'',
            rating:0,
            totreviews:0,
            sum:0,
            totqnt:0
        }

        this.onChangeCnt = this.onChangeCnt.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeCnt(event) {
        this.setState({ cnt: event.target.value });
    }
   
    onSubmit(e) {
        e.preventDefault();

        const FindProductStat = {
            pdtowner: this.state.pdtowner,
            pdtname: this.state.pdtname
        }

        axios.post('http://localhost:4000/pdtstat',FindProductStat)
            .then(res => {
                
                console.log(res.data);
                this.setState({sum: res.data.totcnt, totqnt: res.data.quantity});
                    console.log(this.state.sum)
                    console.log(this.state.cnt)
                    console.log(this.state.totqnt)

                    if((Number(this.state.sum) + Number(this.state.cnt))<(Number(this.state.totqnt)))
                    {
                        this.setState({pdtstat: "Waiting"});
                        const AddOrder = {
                            pdtowner: this.state.pdtowner,
                            username: this.state.username,
                            cnt: this.state.cnt,
                            pdtname: this.state.pdtname,
                            pdtstatus: this.state.pdtstat,
                            quantity: this.state.totqnt,
                            totcnt: (Number(this.state.sum)+Number(this.state.cnt))
                        }

                        axios.post('http://localhost:4000/addorder', AddOrder)
                            .then(res => console.log(res.data));


                        const UpdatePdtStat = {
                            pdtowner: this.state.pdtowner,
                            pdtname: this.state.pdtname,
                            pdtstatus: this.state.pdtstat,
                            totcnt: (Number(this.state.sum)+Number(this.state.cnt))
                        }

                        axios.put('http://localhost:4000/pdtstatall',UpdatePdtStat)
                            .then(res => console.log(res.data));
                        const Num = {
                            pdtowner: this.state.pdtowner,
                            pdtname: this.state.pdtname,
                            total : (Number(this.state.sum)+Number(this.state.cnt)),
                            stat: this.state.pdtstat
                        }

                        axios.put('http://localhost:4000/quantity', Num)
                            .then(res => console.log(res.data));
                    }
                    else
                    {
                        console.log("DISPATCHING");
                        this.setState({pdtstat: "Ready To Dispatch"});
                        const AddOrder = {
                            pdtowner: this.state.pdtowner,
                            username: this.state.username,
                            cnt: this.state.cnt,
                            pdtname: this.state.pdtname,
                            pdtstatus: this.state.pdtstat,
                            quantity: this.state.totqnt,
                            totcnt: (Number(this.state.sum)+Number(this.state.cnt))
                        }

                        axios.post('http://localhost:4000/addorder', AddOrder)
                            .then(res => console.log(res.data));


                        const UpdatePdtStat = {
                            pdtowner: this.state.pdtowner,
                            pdtname: this.state.pdtname,
                            pdtstatus: this.state.pdtstat,
                            totcnt: (Number(this.state.sum)+Number(this.state.cnt))
                        }

                        axios.put('http://localhost:4000/pdtstatall',UpdatePdtStat)
                            .then(res => console.log(res.data));
                        const Num = {
                            pdtowner: this.state.pdtowner,
                            pdtname: this.state.pdtname,
                            total : (Number(this.state.sum)+Number(this.state.cnt)),
                            stat: this.state.pdtstat
                        }

                        axios.put('http://localhost:4000/quantity', Num)
                            .then(res => console.log(res.data));


                    }
 
                this.setState({
                    cnt: '',
                    pdtstat:"",
                    rating:0,
                    totreviews:0,
                    sum:0,
                    totqnt:0
                });		

        this.props.history.push({
            pathname:"/login/customer/:username/search/pdt/order/rate",
            cust_id: this.state.cust_id,
            username: this.state.username,
            pdtname: this.state.pdtname,
            pdtowner: this.state.pdtowner
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
                        <label>Please Enter the Quantity: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.cnt}
                               onChange={this.onChangeCnt}
                               />  
                    </div>
                   
                    <div className="form-group">
                        <input type="submit" value="Order Now" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
