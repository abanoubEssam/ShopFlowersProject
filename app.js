import  path from 'path';
import passport from 'passport';
const swaggerDocs = require('./services/swaggerDocs.service');
const mongoose = require('mongoose');

import  config  from 'config'

const shops = require('./routes/shop.routes');
const User = require('./routes/user.routes');
const auth = require('./routes/auth.routes');

// const FavFlower = require('./routes/favflowers.routes');
const globalFlowers = require('./routes/allFlowers.routes');
// const Sponsered = require('./routes/sponser.routes');

// const Order = require('./routes/order.routes');
// const Carts = require('./routes/cart.routes');
const pushNotification = require('./routes/user-push-token.routes');
const Notification = require('./routes/notification.routes');
const express = require('express');
const app = express();

swaggerDocs(app);

const db = config.get('db');

mongoose.connect( db , {
  useNewUrlParser: true
})
  .then(() => console.log(`Connected to ${db}...`))
  .catch(err => console.error(`Could not connect to ${db}...`));


app.use(express.json());
app.use(passport.initialize());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/shops', shops);
//to get flowers only 
app.use('/api/flowers', globalFlowers);
// it was /apo/shops
// app.use('/api/shops' , Sponsered)
app.use('/api/users', User);
app.use('/api/notification' , Notification);
// app.use('/api/users', FavFlower);
// app.use('/api/users', Carts);
// app.use('/api/users', Order);
app.use('/api/push-notifications', pushNotification);

app.use('/api/auth', auth);

app.use((req,res,next)=> { 
  console.log('Method',req.method);
  console.log('ROUTE: ', req.route);
  next();
});



app.use((err, req, res, next) => {
  console.log('/////////////////////======*****', err, '*****=========\\\\\\\\\\\\ ');
  res.status(err.status || 400).send(err.message);
});

// module.exports = app;

const port = process.env.PORT || 3000;

const server  = app.listen(port , () => console.log(`listen to ${port}`) );

module.exports = server;
