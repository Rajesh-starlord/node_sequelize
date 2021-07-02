var express = require('express');
var router = express.Router();
const { Project, User } = require('../sequelize');
var Response = require('../src/core/response');
const validate = require('../src/utils/validateutil');
const validateutil = new validate();

/* Add project. */
router.post('/addProject', function (req, res) {
    try {
        if (validateutil.validateProject(req.body)) {
            Project.create(req.body)
                .then(project => res.send(new Response('success', 'project added successfully', project)))
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

/* GET projects. */
router.get('/getAllProjects', function (req, res) {
    try {
        Project.findAll({include: [{
            model: User
          }]}).then(projects => res.send(new Response('success', 'successfull', projects)))
            .catch(err => {
                console.log(err);
                new Response('success', 'error', [])
            });
    } catch (e) {
        console.log(e);
        res.send(new Response('filed', 'error', []));
    }
});

/* GET project by id. */
router.get('/getproject/:id', function (req, res) {
    try {
        Project.findAll({ where: { id: req.params.id } })
        .then(project =>{
            let found = true;
            if (!project.length > 0) {
                found = false;
            }
            res.send(new Response(found?'success':'failed', found?'project found':'project not found', project))
          }).catch(err => {
                console.log(err);
                res.send(new Response('success', 'error', []));
            });
    } catch (e) {
        console.log(e);
        res.send(new Response('filed', 'error', []));
    }
});

/* UPDATE project by id. */
router.post('/updateproject/:id', function (req, res) {
    try {
        if (validateutil.validateProject(req.body)) {
            Project.findByPk(req.params.id).then(function (project) {
                project.update({
                    projectname: req.body.projectname
                }).then((project) => {
                    res.send(new Response('success', 'project updated successfully', project))
                }).catch(err => {
                    res.send(new Response('failed', 'project update failed', req.body));
                });
            }).catch(err => {
                res.send(new Response('success', 'project not found', []))
            });
        } else {
            res.status(400).send(new Response('filed', 'invalid data', []));
        }
    } catch (e) {
        console.log(e);
        res.send(new Response('failed', 'project update failed', req.body));
    }
});

/* DELETE project by id. */
router.post('/deleteproject/:id', function (req, res) {
    try {
        Project.findByPk(req.params.id).then(function (project) {
            project.destroy();
        }).then((project) => {
            res.send(new Response('success', 'project deleted successfully', project));
        }).catch(err => {
            res.send(new Response('failed', 'project deletion failed', { id: req.params.id }))
        });
    } catch (e) {
        console.log(e);
        res.send(new Response('filed', 'error', []));
    }
});

module.exports = router;
