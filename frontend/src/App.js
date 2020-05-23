import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import LoginUser from './components/login.component'
import VendorApp from './components/vendorpage.component'
import VendorView from './components/vendorview.component'
import VendorWaitView from './components/vendorwaitview.component'
import VendorReadyView from './components/vendorreadyview.component'
import VendorDispatchedView from './components/vendordispatchedview.component'
import VendorCancelledView from './components/vendorcancelview.component'
import VendorAdd from './components/vendoradd.component'
import Customer from './components/customer.component'
import CustomerCart from './components/customerview.component'
import CustomerEdit from './components/customeredit.component'
import CustomerSearch from './components/customersearch.component'
import CustomerPdt from './components/customerpdt.component'
import CustomerOrder from './components/customerorder.component'
import CustomerRate from './components/customerrate.component'
import PdtRateReview from './components/customerpdtrate.component'

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        <Route path="/" exact component={UsersList}/>
        <Route path="/create" exact component={CreateUser}/>
        <Route path="/login" exact component={LoginUser}/>
        <Route path="/login/vendor/:username" exact component={VendorApp}/>
        <Route path="/login/vendor/:username/view" exact component={VendorView}/>
        <Route path="/login/vendor/:username/view/waitview" exact component={VendorWaitView}/>
        <Route path="/login/vendor/:username/view/readyview" exact component={VendorReadyView}/>
        <Route path="/login/vendor/:username/view/dispatchedview" exact component={VendorDispatchedView}/>
        <Route path="/login/vendor/:username/view/cancelledview" exact component={VendorCancelledView}/>
        <Route path="/login/vendor/:username/add" exact component={VendorAdd}/>
        <Route path="/login/customer/:username" exact component={Customer}/>
        <Route path="/login/customer/:username/view" exact component={CustomerCart}/>
        <Route path="/login/customer/:username/view/edit" exact component={CustomerEdit}/>
        <Route path="/login/customer/:username/search" exact component={CustomerSearch}/>
        <Route path="/login/customer/:username/search/pdt" exact component={CustomerPdt}/>
        <Route path="/login/customer/:username/search/pdt/order" exact component={CustomerOrder}/>
        <Route path="/login/customer/:username/search/pdt/order/rate" exact component={CustomerRate}/>
        <Route path="/login/customer/:username/view/pdtratereview" exact component={PdtRateReview}/>
      </div>
    </Router>
  );
}

export default App;
