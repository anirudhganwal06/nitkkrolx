const fs = require('fs');

const Student = require('../models/student');
const Product = require('../models/product');

exports.getSell = (req, res, next) => {
    rollNo = req.params.rollNo;
    Student
        .findOne({rollNo: rollNo})
        .then(student => {

            res.render('shop/sellProductPage', {
                pageTitle: 'NITKKR | oLx | Sell',
                student: student
            });

        })
        .catch(err => {
            console.log(err);
        });
};

exports.postSell = (req, res, next) => {
    rollNo = req.params.rollNo;
    title = req.body.title;
    image = req.file;
    mobile = req.body.mobile;
    details = req.body.details;
    price = req.body.price;
    rollNo = req.body.rollNo;
    console.log(image);
    const product = new Product({
        rollNo: rollNo,
        title: title,
        mobile: mobile,
        details: details,
        price: price,
        rollNo: rollNo,
        uniqid: image.filename
    });
    product
        .save()
        .then(() => {
            res.redirect('/' + rollNo);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getBuy = (req, res, next) => {
    rollNo = req.params.rollNo;
    name = req.session.name;
    Product
        .find()
        .then(products => {
            res.render('shop/buyProductPage', {
                pageTitle: 'NITKKR | oLx | Buy',
                products: products,
                rollNo: rollNo,
                name: name
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProductDetails = (req, res, next) => {
    rollNo = req.params.rollNo;
    name = req.session.name;
    uniqid = req.params.uniqid;
    Product
        .findOne({uniqid: uniqid})
        .then(product => {
            sellerRollNo = product.rollNo;
            Student
                .findOne({rollNo: sellerRollNo})
                .then(seller => {
                    res.render('shop/productDetailsPage', {
                        pageTitle: 'NITKKR | oLx | Details',
                        product: product,
                        rollNo: rollNo,
                        name: name,
                        seller: seller
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getItemsOutForSale = (req, res, next) => {
    rollNo = req.params.rollNo;
    name = req.session.name;
    Product
        .find({rollNo: rollNo})
        .then(products => {
            res.render('shop/itemsOutForSalePage', {
                pageTitle: 'NITKKR | oLx | For Sale',
                products: products,
                rollNo: rollNo,
                name: name
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getProductEdit = (req, res, next) => {
    rollNo = req.params.rollNo;
    uniqid = req.params.uniqid;
    Product
    .findOne({uniqid: uniqid})
    .then(product => {
        res.render('shop/productEditPage', {
            pageTitle: 'NITKKR | oLx | Edit',
            product: product,
            rollNo: rollNo
        })
    })
    .catch(err => {
        console.log(err);
    });
};  

exports.postProductEdit = (req, res, next) => {
    rollNo = req.params.rollNo;
    uniqid = req.params.uniqid;
    title = req.body.title;
    mobile = req.body.mobile;
    details = req.body.details;
    price = req.body.price;
    Product
        .findOneAndUpdate({uniqid: uniqid}, {
            title: title,
            mobile: mobile,
            details: details,
            price: price
        })
        .then(product => {
            res.redirect('/' + rollNo + '/items-out-for-sale');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getProductDelete = (req, res, next) => {
    rollNo = req.params.rollNo;
    uniqid = req.params.uniqid;
    fs.unlinkSync('static/images/' + uniqid);  
    Product
        .findOneAndDelete({uniqid: uniqid})
        .then(() => {
            res.redirect('/' + rollNo + '/items-out-for-sale');
        })
        .catch(err => {
            console.log(err);
        });
};