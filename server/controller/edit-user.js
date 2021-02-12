const Userdb = require('../models/model');
const axios = require('axios');
exports.getAdd = (req, res) => {
  res.render('add-user', {
    title: 'New User',
    method: 'post',
    edit: false,
    action: `/api/users`,
  });
};
exports.postAdd = (req, res) => {
  console.log(req.body);
  res.redirect('/add-user');
};
exports.getUpdate = (req, res) => {
  const hostName = process.env.HOSTNAME;
  const id = req.params.id;
  axios.get(`${hostName}/api/users/?id=${id}`).then((response) => {
    res.render('update-user', {
      title: 'Edit User',
      method: 'put',
      user: response.data,
      edit: true,
      action: id,
    });
  });
};
// api
exports.create = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const gender = req.body.gender;
  const status = req.body.status;

  if (!req.body) {
    return res.status(400).send({ message: 'Content can not empty.' });
  }
  //init model
  const user = new Userdb({ firstName, lastName, email, gender, status });
  // save to db
  user
    .save(user)
    .then(() => {
      // res.send(data);
      return res.redirect('/');
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message + '😥' || 'Some Error With Create Action 😥',
      });
    });
};
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    return Userdb.findById(id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: `User Not Found.` });
        }
        return res.send(data);
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message + '😓' || 'Some Error With Find By ID',
        });
      });
  }
  Userdb.find()
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message + '😥' || 'Some Error With Create Action 😥',
      });
    });
};
exports.update = (req, res) => {
  console.log('reach update', '+++++++', req.body);
  if (!req.body) {
    return res.status(400).send({ message: 'Content can not empty.' });
  }

  const id = req.params.id;
  Userdb.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'User is not exist.' });
      }
      return res.send(data);
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ message: err.message + '😭' || 'Error when update 😭' });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log('====================================');
  console.log(id);
  console.log('====================================');
  Userdb.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: 'User is not exist.' });
      }
      return res.send({ message: 'Delete Success!' });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message + '🥵' || 'Error when delete action 🥵' });
    });
};
