import  path from 'path';
import passport from 'passport';
const swaggerDocs = require('./services/swaggerDocs.service');
const mongoose = require('mongoose');

import  config  from 'config'

const shops = require('./routes/shop.routes');
const User = require('./routes/user.routes');
const auth = require('./routes/auth.routes');

const globalFlowers = require('./routes/allFlowers.routes');

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

require('./services/prod')(app)
app.use(express.json());
app.use(passport.initialize());


app.use('/uploads', express.static(path.join(__dirname, '..' , 'uploads')));
app.use('/api/shops', shops);
app.use('/api/flowers', globalFlowers);
app.use('/api/users', User);
app.use('/api/notification' , Notification);
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


const port = process.env.PORT || 3000;

const server  = app.listen(port , () => console.log(`listen to ${port}`) );

module.exports = server;
