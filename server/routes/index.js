const express = require('express');
const axios = require('axios');

const route = express.Router();
route.get('/', (req, res) => {
  axios.get('http://localhost:3000/api/users').then((response) => {
    return res.render('index', {
      title: 'User Management',
      users: response.data,
    });
  });
});
module.exports = route;
