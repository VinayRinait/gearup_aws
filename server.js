const express = require("express");
const app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const path = require('path')
let ejs = require('ejs');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
require("dotenv").config();
const { PORT, MONGODB_URI } = require("./config/config");

var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'mySessions'
});


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: store
  // cookie: {
  //   expires: 600000
  // }
}));

app.use(express.static(path.join(__dirname, 'public')))
app.use('/img',express.static('img'))
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false,  parameterLimit: 50000}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


var user = require("./routes/user");
let category = require("./routes/category");
let product = require("./routes/product");
let merchant = require("./routes/merchant");
let webUser = require("./routes/webUser");
let webCategory= require("./routes/webCategory");
let webProduct= require("./routes/webProduct");
let dashboard = require("./routes/dashboard")
let deliveryPerson = require("./routes/deliveryPerson");
let Order = require("./routes/order")
let userCart= require("./routes/userCart");


//assuming app is express Object.
app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.use("/webUser",webUser)
app.use("/",webCategory)
app.use("/webProduct",webProduct)
app.use("/users",user);
app.use("/categorys",category);
app.use('/products', product)
app.use("/merchants", merchant)
app.use("/dashboard", dashboard)
app.use("/delivery", deliveryPerson);
app.use("/order", Order);
app.use("/userCart", userCart)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true })
.then(result=> {
  app.listen(PORT);
  console.log('Database connected');
  console.log(`Server Running on${PORT}`);
})
.catch(err => console.log(err));