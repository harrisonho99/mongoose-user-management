const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const app = express();
const morgan = require('morgan');
const dir = require('./utils/path');
const editUserRoute = require('./server/routes/edit-user');
const homeRoute = require('./server/routes/index');
const connectDB = require('./server/models/connection');
// variable environment
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;
// parse request
app.use(express.urlencoded({ extended: true }));
//logger
const accessLogStream = fs.createWriteStream(path.join(dir, 'access.log'));
app.use(morgan('combined', { stream: accessLogStream }));
//mongoose connect
connectDB();
// template engine
app.set('view engine', 'ejs');
app.set('views', path.join(dir, 'views/'));
//load assets
app.use('/css', express.static(path.join(dir, 'assets/css')));
app.use('/img', express.static(path.join(dir, 'assets/img')));
app.use('/js', express.static(path.join(dir, 'assets/js')));
app.use('/public', express.static(path.join(dir, 'assets/public')));
//request
app.use(editUserRoute);
app.use(homeRoute);
app.get('*', (_, res) => {
  res.redirect('/');
});
app.listen(PORT, () => {
  console.log(`app running on http://localhost:${PORT}.`);
});
