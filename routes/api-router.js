const db = require("../models");

module.exports = function (app) {
    app.post('/api/student', function ({ body }, res) {
        console.log('request recieved')
        console.log(body);
        db.Student.addStudent(body, function (result) {
            res.json({ result: result });
            console.log(result)
        })
        // db.Student.create(body)
        //     .then(dbStudent => {
        //         res.json({ result: 1 });
        //     })
        //     .catch(err => {
        //         res.status(404).json(err);
        //     });
    });

    app.propfind('/:id', function (req, res) {
        const sid = req.params.id;
        db.Student.checkId(sid, function (result) {
            res.json({ result: result });
        })
        console.log('propfind request has received')
    })

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
                console.log(data);
            })
    })
}