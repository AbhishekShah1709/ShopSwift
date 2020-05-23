const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Pdt = require('./models/pdt');
let Order = require('./models/order');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

userRoutes.route('/addorder').post(function(req, res) {
    let order = new Order(req.body);
    order.save()
        .then(pdt=> {
            res.status(200).json({'Order': 'Order added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

userRoutes.route('/addpdt').post(function(req, res) {
    let pdt = new Pdt(req.body);
    pdt.save()
        .then(pdt=> {
            res.status(200).json({'Pdt': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Getting a user by id
userRoutes.route('/login').post(function(req, res) {
//    let id = req.params.id;
    let finduser = req.body.username;
    let findpassword = req.body.password;
    User.findOne({username: `${finduser}`, password: `${findpassword}`}  ,function(err, users) {
        res.json(users);
    });
});

userRoutes.route('/viewdispatchedpdt/:username').post(function(req, res) {
    let specvend = req.params.username;
    let arr = specvend.split(":");

    Pdt.find({username: `${arr[1]}`, pdtstatus: "Dispatched"},function(err, pdt) {
        if (err) {
            console.log(err);
        } else {
            res.json(pdt);
        }
    });
});

userRoutes.route('/viewcancelledpdt/:username').post(function(req, res) {
    let specvend = req.params.username;
    let arr = specvend.split(":");

    Pdt.find({username: `${arr[1]}`, pdtstatus: "Cancelled"},function(err, pdt) {
        if (err) {
            console.log(err);
        } else {
            res.json(pdt);
        }
    });
});

userRoutes.route('/viewreadypdt/:username').post(function(req, res) {
    let specvend = req.params.username;
    let arr = specvend.split(":");

    Pdt.find({username: `${arr[1]}`, pdtstatus: "Ready To Dispatch"},function(err, pdt) {
        if (err) {
            console.log(err);
        } else {
            res.json(pdt);
        }
    });
});

userRoutes.route('/viewwaitpdt/:username').post(function(req, res) {
    let specvend = req.params.username;
    let arr = specvend.split(":")
    
    Pdt.find({username: `${arr[1]}`, pdtstatus: "Waiting"},function(err, pdt) {
        if (err) {
            console.log(err);
        } else {
            res.json(pdt);
        }
    });
});

userRoutes.route('/orderstat').post(function(req, res) {
//    let id = req.params.id;
    let finduser = req.body.username;
    let findowner = req.body.pdtowner;
    let findpdt = req.body.pdtname;

    console.log("ORDERSTAT")
    console.log(finduser)
    console.log(findpdt)
    Order.findOne({username: `${finduser}`, pdtname: `${findpdt}`, pdtowner: `${findowner}`}, function(err, pdt) {
        res.json(pdt);
    });
});


userRoutes.route('/findtotpdtratingreview').post(function(req, res) {
//    let id = req.params.id;
    let finduser = req.body.pdtowner;
    let findpdt= req.body.pdtname;
    console.log("REVIEWWSSSSS")
    console.log(finduser)
    console.log(findpdt)
    Pdt.findOne({username: `${finduser}`, pdtname: `${findpdt}`}, function(err, pdt) {
        res.json(pdt);
    });
});

userRoutes.route('/pdtratingreview').put(function(req, res) {
//    let id = req.params.id;
    let findowner = req.body.pdtowner;
    let pdtname = req.body.pdtname;
    let pdtrating = req.body.pdtrating;
    let reviews = req.body.review;
    let pdttotreviews = req.body.pdttotreviews;
    
    console.log("PDTRATINGREVIEW");
    console.log(findowner)
    console.log(pdtname)
    console.log(pdtrating)
    console.log(reviews)
    console.log(pdttotreviews)

    Pdt.updateOne({username: `${findowner}`, pdtname: `${pdtname}`},{pdtrating: `${pdtrating}`, reviews: `${reviews}`, pdttotreviews: `${pdttotreviews}`}, function(err, pdt) {
        res.json(pdt);
    });
});

userRoutes.route('/rating').put(function(req, res) {
//    let id = req.params.id;
    let findowner = req.body.pdtowner;
    let rating = req.body.rating;
    let totreviews = req.body.totreviews;
    Pdt.updateMany({username: `${findowner}`},{rating: `${rating}`, totreviews: `${totreviews}`}, function(err, pdt) {
        res.json(pdt);
    });
});

userRoutes.route('/getrating').post(function(req, res) {
//    let id = req.params.id;
    let finduser = req.body.pdtowner;
    console.log(finduser)
    Pdt.findOne({username: `${finduser}`}, function(err, pdt) {
        res.json(pdt);
    });
});


userRoutes.route('/pdtstat').post(function(req, res) {
//    let id = req.params.id;
    let finduser = req.body.pdtowner;
    let findpdt = req.body.pdtname;
    console.log("PDTSTAT")
    console.log(finduser)
    console.log(findpdt)
    Pdt.findOne({username: `${finduser}`, pdtname: `${findpdt}`}, function(err, pdt) {
        res.json(pdt);
    });
});

userRoutes.route('/cancelorder').put(function(req, res) {
    let findowner = req.body.username;
    let findpdt = req.body.pdtname;
    let upstat = req.body.stat;
   
    Order.updateMany({pdtowner: `${findowner}`, pdtname: `${findpdt}`},{pdtstatus: "Cancelled"}, function(err, pdt) {
        res.json(pdt);
    });
});

userRoutes.route('/cancel').put(function(req, res) {
    let findowner = req.body.username;
    let findpdt = req.body.pdtname;
    let upstat = req.body.stat;
   
    Pdt.updateOne({username: `${findowner}`, pdtname: `${findpdt}`},{pdtstatus: "Cancelled"}, function(err, pdt) {
        res.json(pdt);
    });
});

userRoutes.route('/dispatchorder').put(function(req, res) {
    let findowner = req.body.username;
    let findpdt = req.body.pdtname;
    let upstat = req.body.stat;
   
    Order.updateMany({pdtowner: `${findowner}`, pdtname: `${findpdt}`},{pdtstatus: "Dispatched"}, function(err, pdt) {
        res.json(pdt);
    });
});



userRoutes.route('/dispatch').put(function(req, res) {
    let findowner = req.body.username;
    let findpdt = req.body.pdtname;
    let upstat = req.body.stat;
   
    Pdt.updateOne({username: `${findowner}`, pdtname: `${findpdt}`},{pdtstatus: "Dispatched"}, function(err, pdt) {
        res.json(pdt);
    });
});

userRoutes.route('/quantity').put(function(req, res) {
    let findowner = req.body.pdtowner;
    let findpdt = req.body.pdtname;
    let upstat = req.body.stat;
    let uptotal = req.body.total;

    Pdt.updateOne({username: `${findowner}`, pdtname: `${findpdt}`},{pdtstatus: `${upstat}`, totcnt: `${uptotal}`}, function(err, pdt) {
        res.json(pdt);
    });
});

userRoutes.route('/updateorder').put(function(req, res) {
    let finduser = req.body.username;
    let findowner = req.body.pdtowner;
    let findpdt = req.body.pdtname;
    let upcnt = req.body.cnt;
    
//    console.log(findowner)
//    console.log(findpdt)
//    console.log(upstat)
//    console.log(uptotal)

    Order.updateOne({pdtowner: `${findowner}`, pdtname: `${findpdt}`, username: `${finduser}`},{cnt: `${upcnt}`}, function(err, pdt) {
        res.json(pdt);
    });
});

userRoutes.route('/pdtstatall').put(function(req, res) {
    let findowner = req.body.pdtowner;
    let findpdt = req.body.pdtname;
    let upstat = req.body.pdtstatus;
    let upcnt = req.body.totcnt;
    
    Order.updateMany({pdtowner: `${findowner}`, pdtname: `${findpdt}`},{pdtstatus: `${upstat}`, totcnt: `${upcnt}`}, function(err, pdt) {
        res.json(pdt);
    });
});

userRoutes.route('/cart').post(function(req, res) {
    name = req.body.username
    Order.find({username: `${name}`}, function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/searchpdt').post(function(req, res) {
//    let id = req.params.id;
    let findpdt = req.body;
    Pdt.find(findpdt, function(err, pdt) {
        res.json(pdt);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
