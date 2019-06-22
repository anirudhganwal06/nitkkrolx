const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');
const uniqid = require('uniqid');



const app = express();

const mongoURI = 'mongodb+srv://anirudhganwal06:mongodb06@cluster0-yaqyh.mongodb.net/nitkkrolx?retryWrites=true';

const store = new MongoDBStore({
    uri: mongoURI,
    collection: 'sessions'
});


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/images');
    },
    filename: (req, file, cb) => { 
        const extention = file.originalname.split('.')[1];
        cb(null, uniqid() + '.' + extention);
    }
});

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'static')));
app.use(multer({storage: fileStorage}).single('image'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
    
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(authRoutes);
app.use(shopRoutes);
app.use(userRoutes);


app.use('/', (req, res, next) => {
    res.status(404).render('error/404.ejs', {
        pageTitle: '404 | Page Not Found'
    });
});

exports.uniqid = uniqid;

mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useFindAndModify: false 
    })
    .then(() => {
        app.listen(process.env.PORT || 3000, console.log('Server started'));
    })
    .catch(err => {
        console.log(err);
    });