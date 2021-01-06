const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: Number,
    name: String,
    sex: String,
    age: Number
});

studentSchema.statics.addStudent = function (json, cb) {
    Student.checkId(json.id, function (isExist) {
        if (isExist) {
            let s = new Student(json);
            s.save(function (err) {
                cb(-2);
            });
            cb(1);
        }
        else {
            cb(-1);
        }
    })
}

studentSchema.statics.checkId = function (id, cb) {
    this.find({ id: id }, function (err, results) {
        cb(results.length == 0);
    })
}

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
