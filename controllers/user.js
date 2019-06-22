const Student = require('../models/student');

exports.getUserHomePage = (req, res, next) => {
    // console.log(req.session);
    if (req.session.isLoggedIn === true) {
        rollNo = req.session.rollNo;
        name = req.session.name;
        res.render('user/userHomePage', {
            pageTitle: 'NITKKR | oLx',
            req: req,
            rollNo: rollNo,
            name: name
        });
    } else {
        res.redirect('/login');
    }
};

exports.getUserPersonalInfo = (req, res, next) => {
    rollNo = req.params.rollNo;
    Student
        .findOne({rollNo: rollNo})
        .then(student => {
            res.render('user/userPersonalInfo', {
                pageTitle: 'NITKKR | oLx | Personal Info',
                student: student
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getUpdateUserPersonalInfo = (req, res, next) => {
    rollNo = req.params.rollNo;
    Student
        .findOne({rollNo: rollNo})
        .then(student => {
            res.render('user/updatePersonalInfo', {
                pageTitle: 'NITKKR | oLx | Update Personal Info',
                student: student
            })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postUpdateUserPersonalInfo = (req, res, next) => {
    rollNo = req.params.rollNo;
    name = req.body.name;
    programme = req.body.programme;
    mobile = req.body.mobile;
    email = req.body.email;
    semester = req.body.semester;
    Student.findOneAndUpdate({rollNo: rollNo}, {
        name: name,
        programme: programme,
        mobile: mobile,
        email: email,
        semester: semester
    })
    .then(student => {
        res.redirect('/' + rollNo);
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getChangePassword = (req, res, next) => {
    rollNo = req.params.rollNo;
    name = req.session.name;
    res.render('user/changePassword', {
        pageTitle: 'NITKKR | oLx | Change Password',
        rollNo: rollNo,
        name: name
    });
};

exports.postChangePassword = (req, res, next) => {
    rollNo = req.params.rollNo;
    newPassword = req.body.newPassword;
    oldPassword = req.body.oldPassword;
    Student
        .findOne({rollNo: rollNo})
        .then(student => {
            if (student.password === oldPassword) {
                Student
                    .findOneAndUpdate({rollNo: rollNo}, {
                        password: newPassword
                    })
                    .then(student => {
                        res.redirect('/' + rollNo);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                res.redirect('/' + rollNo + '/change-password');
            }
        })
        .catch(err => {
            console.log(err);
        });
};