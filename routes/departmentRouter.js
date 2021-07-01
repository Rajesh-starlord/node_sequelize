var express = require('express');
var router = express.Router();
const { Department } = require('../sequelize');
var Response = require('../src/core/response');
const validate = require('../src/utils/validateutil');
const validateutil = new validate();

/* Add department. */
router.post('/addDepartment', function (req, res) {
    try {
        if (validateutil.validateDepartment(req.body)) {
            Department.create(req.body)
                .then(department => res.send(new Response('success', 'department added successfully', department)))
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

/* GET departments. */
router.get('/getAllDepartments', function (req, res) {
    try {
        Department.findAll().then(departments => res.send(new Response('success', 'successfull', departments)))
            .catch(err => {
                console.log(err);
                new Response('success', 'error', [])
            });
    } catch (e) {
        console.log(e);
        res.send(new Response('filed', 'error', []));
    }
});

/* GET department by id. */
router.get('/getdepartment/:id', function (req, res) {
    try {
        Department.findAll({ where: { id: req.params.id } })
        .then(department => res.send(
            new Response(department.id?'success':'failed', department.id?'department found':'department not found', department))
            ).catch(err => {
                console.log(err);
                res.send(new Response('success', 'error', []));
            });
    } catch (e) {
        console.log(e);
        res.send(new Response('filed', 'error', []));
    }

});

/* UPDATE department by id. */
router.post('/updatedepartment/:id', function (req, res) {
    try {
        if (validateutil.validateDepartment(req.body)) {
            Department.findByPk(req.params.id).then(function (department) {
                department.update({
                    deptname: req.body.deptname
                }).then((department) => {
                    res.send(new Response('success', 'department updated successfully', department))
                }).catch(err => {
                    res.send(new Response('failed', 'department update failed', req.body));
                });
            }).catch(err => {
                res.send(new Response('success', 'department not found', []))
            });
        } else {
            res.status(400).send(new Response('filed', 'invalid data', []));
        }
    } catch (e) {
        console.log(e);
        res.send(new Response('failed', 'department update failed', req.body));
    }
});

/* DELETE department by id. */
router.post('/deletedepartment/:id', function (req, res) {
    try {
        Department.findByPk(req.params.id).then(function (department) {
            department.destroy();
        }).then((department) => {
            res.send(new Response('success', 'department deleted successfully', department));
        }).catch(err => {
            res.send(new Response('failed', 'department deletion failed', { id: req.params.id }))
        });
    } catch (e) {
        console.log(e);
        res.send(new Response('filed', 'error', []));
    }

});

module.exports = router;
