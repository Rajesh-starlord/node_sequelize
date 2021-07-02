var express = require('express');
var router = express.Router();
const { ProjectAssign } = require('../sequelize');
var Response = require('../src/core/response');
const validate = require('../src/utils/validateutil');
const validateutil = new validate();

/* Add projectAssign. */
router.post('/assignProject', function (req, res) {
  try {
    if (validateutil.validateProjectAssign(req.body)) {
      ProjectAssign.create(req.body)
        .then(projectAssign => res.send(new Response('success', 'projectAssign added successfully', projectAssign)))
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

/* GET projectAssigns. */
router.get('/getAllProjectAssigns', function (req, res) {
  try {
    ProjectAssign.findAll().then(projectAssigns => res.send(new Response('success', 'successfull', projectAssigns)))
      .catch(err => {
        console.log(err);
        new Response('success', 'error', [])
      });
  } catch (e) {
    console.log(e);
    res.send(new Response('filed', 'error', []));
  }
});

/* GET projectAssign by id. */
router.get('/getprojectAssign/:id', function (req, res) {
  try {
    ProjectAssign.findAll({ where: { id: req.params.id } })
        .then(projectAssign => {
          let found = true;
          if (!projectAssign.length > 0) {
            found = false;
          }
          res.send(new Response(found?'success':'failed', found?'projectAssign found':'projectAssign not found', projectAssign))
        }).catch(err => {
                console.log(err);
                res.send(new Response('success', 'error', []));
            });
  } catch (e) {
    console.log(e);
    res.send(new Response('filed', 'error', []));
  }
});

/* GET projectAssign by userid. */
router.get('/getprojectAssignByUser/:userid', function (req, res) {
  try {
    ProjectAssign.findAll({ where: { userId: req.params.userid } })
        .then(projectAssign => {
          let found = true;
          if (!projectAssign.length > 0) {
            found = false;
          }
          res.send(new Response(found?'success':'failed', found?'projectAssign found':'projectAssign not found', projectAssign))
        }).catch(err => {
                console.log(err);
                res.send(new Response('success', 'error', []));
            });
  } catch (e) {
    console.log(e);
    res.send(new Response('filed', 'error', []));
  }
});

/* DELETE projectAssign by id. */
router.post('/deleteprojectAssign/:id', function (req, res) {
  try {
    ProjectAssign.findByPk(req.params.id).then(function (projectAssign) {
      projectAssign.destroy();
    }).then((projectAssign) => {
      res.send(new Response('success', 'projectAssign deleted successfully', projectAssign));
    }).catch(err => {
      res.send(new Response('failed', 'projectAssign deletion failed', { id: req.params.id }))
    });
  } catch (e) {
    console.log(e);
    res.send(new Response('filed', 'error', []));
  }
});

module.exports = router;
