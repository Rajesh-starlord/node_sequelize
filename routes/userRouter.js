var express = require('express');
var router = express.Router();
const { User, Project } = require('../sequelize');
var Response = require('../src/core/response');
const validate = require('../src/utils/validateutil');
const validateutil = new validate();

/* Add user. */
router.post('/addUser', function (req, res) {
  try {
    if (validateutil.validateUser(req.body)) {
      User.create(req.body)
        .then(user => res.send(new Response('success', 'user added successfully', user)))
        .catch(err => {
          console.log(err);
          res.send(new Response('filed', 'error', []));
        });
    } else {
      res.status(400).send(new Response('filed', 'invalid data', []));
    }
  } catch (e) {
    console.log(e);
    res.send(new Response('filed', 'error', []));
  }
});

/* GET users. */
router.get('/getAllUsers', function (req, res) {
  try {
    User.findAll({include: [{
      model: Project
    }]}).then(users => res.send(new Response('success', 'successfull', users)))
      .catch(err => {
        console.log(err);
        new Response('success', 'error', [])
      });
  } catch (e) {
    console.log(e);
    res.send(new Response('filed', 'error', []));
  }

});

/* GET user by id. */
router.get('/getuser/:id', function (req, res) {
  try {
    User.findAll({ where: { id: req.params.id } })
        .then(user => {
          let found = true;
          if(user.id === undefined || user.id === null){
            found = false;
          }
          res.send(new Response(found?'success':'failed', found?'user found':'user not found', user))
        }).catch(err => {
                console.log(err);
                res.send(new Response('success', 'error', []));
            });
  } catch (e) {
    console.log(e);
    res.send(new Response('filed', 'error', []));
  }
});

/* UPDATE user by id. */
router.post('/updateuser/:id', function (req, res) {
  try {
    if (validateutil.validateUser(req.body)) {
      User.findByPk(req.params.id).then(function (user) {
        user.update({
          name: req.body.name,
          dept: req.body.dept
        }).then((user) => {
          res.send(new Response('success', 'user updated successfully', user))
        }).catch(err => {
          console.log(err);
          res.send(new Response('failed', 'user update failed', req.body));
        });
      }).catch(err => {
        console.log(err);
        res.send(new Response('success', 'user not found', []))
      });
    } else {
      res.status(400).send(new Response('filed', 'invalid data', []));
    }
  } catch (e) {
    console.log(e);
    res.send(new Response('failed', 'user update failed', req.body));
  }
});

/* DELETE user by id. */
router.post('/deleteuser/:id', function (req, res) {
  try {
    User.findByPk(req.params.id).then(function (user) {
      user.destroy();
    }).then((user) => {
      res.send(new Response('success', 'user deleted successfully', user));
    }).catch(err => {
      res.send(new Response('failed', 'user deletion failed', { id: req.params.id }))
    });
  } catch (e) {
    console.log(e);
    res.send(new Response('filed', 'error', []));
  }
});

module.exports = router;
