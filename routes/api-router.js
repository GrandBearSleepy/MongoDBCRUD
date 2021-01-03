const db = require("../models");

module.exports = function (app) {
    app.post('/api/student', function (req, res) {
        console.log('request recieved')
        console.log(req.body);
        db.Student.create(req.body)
            .then(dbStudent => {
                res.json(dbStudent);
            })
            .catch(err => {
                res.status(404).json(err);
            });
    });

    app.get('/student', function (req, res) {
        db.Student.find({})
            .then(dbStudent => {
                res.json({ results: dbStudent });
                // console.log(dbStudent);
            })
            .catch(err => {
                res.status(404).json(err);
            })
    });

    app.get('/api/student/:id', function (req, res) {
        db.Student.findOne({ id: req.params.id }).lean()
            .then((data) => {
                res.render('modify', { student: data });
                // console.log(student)
            })
            .catch(err => {
                res.status(404).json(err)
            });

    });

    app.post('/api/student/:id', function (req, res) {
        db.Student.findOne({ id: req.params.id })
            .then(data => {
                data.name = req.body.name;
                data.age = req.body.age;
                data.sex = req.body.sex;
                data.save();
            })
            .catch(err => {
                res.status(404).json(err);
            });

    });

    app.delete('/api/student/:id', function (req, res) {
        db.Student.deleteOne({ id: req.params.id })
            .then(data => {
                res.json(data);
            })
    })
}