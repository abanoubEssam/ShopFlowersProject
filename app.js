import path from 'path';
import passport from 'passport';
const swaggerDocs = require('./services/swaggerDocs.service');
const mongoose = require('mongoose');

const shops = require('./routes/shop.routes');
const User = require('./routes/user.routes');
const auth = require('./routes/auth.routes');

const FavFlower = require('./routes/favflowers.routes');
const Flowers = require('./routes/flower.routes');
const Sponsered = require('./routes/sponser.routes');

const Order = require('./routes/order.routes');
const Carts = require('./routes/cart.routes');
const pushNotification = require('./routes/user-push-token.routes');
const Notification = require('./routes/notification.routes');
const express = require('express');
const app = express();

swaggerDocs(app);

mongoose.connect('mongodb://localhost/ShopsFlowers', {
  useNewUrlParser: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/shops', shops);
//to get flowers only 
app.use('/api/flowers', Flowers);
app.use('/api/shops' , Sponsered)
app.use('/api/users', User);
app.use('/api/notification' , Notification);
app.use('/api/users', FavFlower);
app.use('/api/users', Carts);
app.use('/api/users', Order);
app.use('/api/push-notifications', pushNotification);

app.use('/api/auth', auth);
app.use((err, req, res, next) => {
  console.log('/////////////////////======*****', err, '*****=========\\\\\\\\\\\\ ');
  res.status(err.status || 400).send(err.message);
});

app.listen(3000);