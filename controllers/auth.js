const Student = require('../models/student');

exports.getLogin = (req, res, next) => {
    res.render('auth/loginPage', {
        pageTitle: 'NITKKR | oLx | Login' 
    });
};

exports.postLogin = (req, res, next) => {
    rollNo = req.body.rollNo;
    password = req.body.password;
    Student
        .findOne({rollNo: rollNo})
        .then(student => {
            if (student.password === password) {
                req.session.rollNo = rollNo;
                req.session.name = student.name;
                req.session.isLoggedIn = true;
                res.redirect('/'+ rollNo);
            } else {
                res.redirect('/login');
            }
        })
        .catch(err => {
            console.log('student not found');
            res.redirect('/login');
        });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signupPage', {
        pageTitle: 'NITKKR | oLx | Signup'
    })
};

exports.postSignup = (req, res, next) => {
    rollNo = req.body.rollNo;
    name = req.body.name;
    programme = req.body.programme;
    mobile = req.body.mobile;
    email = req.body.email;
    semester = req.body.semester;
    password = req.body.password; 
    
    Student
        .findOne({rollNo: rollNo})
        .then(student => {
            if (student) {
                res.redirect('/signup');
            } else {
                const student = new Student({
                    rollNo: rollNo,
                    name: name,
                    programme: programme,
                    mobile: mobile,
                    email: email,
                    semester: semester,
                    password: password
                });
                student
                .save()
                .then(result => {
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
};