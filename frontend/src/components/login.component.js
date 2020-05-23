import React, {Component} from 'react';
import axios from 'axios';

export default class LoginUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const loginUser = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:4000/login', loginUser)
             .then(res => {
                 console.log(res.data)
                 if(!res.data)
                     alert("User Not found");
                 else if(res.data.type === "Vendor")
                    this.props.history.push({
                        pathname: "/login/vendor/:username",
                        username: loginUser.username,
                        vendor_id: res.data._id
                    });
                 else if(res.data.type === "Customer")
                    this.props.history.push({
                        pathname: "/login/customer/:username",
                        username: loginUser.username,
                        cust_id: res.data._id
                    });
             });
        
        this.setState({
            username: '',
            password: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
