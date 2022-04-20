const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const allblogsroutes = require('./routes/allblogsRoutes');

//express app
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//view engine type
app.set('view engine', 'ejs');

const dbURI='mongodb+srv://pushkar:pushkarchoudhary@cluster0.pupnc.mongodb.net/WEBD1?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));


app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.use(allblogsroutes);

app.get('/',(req,res) => {
    res.render('home');
});

app.get('/about',(req,res) => {
    res.render('about');
});

app.get('/create',(req,res) =>{
    res.render('create');
});

app.use((req,res) =>{
    console.log("page not found");
});
