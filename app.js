const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const port = 80;
const hostname = '127.0.0.1';


mongoose.connect('mongodb://127.0.0.1:27017/');

var contactSchema = new mongoose.Schema({
    username: String,
    email: String,
    contact: Number,
    message: String
});

var Contact = mongoose.model('Contact', contactSchema);

var joinSchema = new mongoose.Schema({
    usresume: {type: Buffer}

});

var join = mongoose.model('join', joinSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('/views', (__dirname + 'view'));
console.log(__dirname);

app.get('/', (req, res) => {
    res.status(200).render('Home.pug');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.get('/about', (req, res) => {
    res.status(200).render('about.pug');
});

app.get('/join', (req, res) => {
    res.status(200).render('join.pug');
});


app.post('/contact', (req, res) => {
    var details = new Contact(req.body);
    details.save().then(() => {
        res.status(200).send("response saved to database");
    }).catch(() => {
        res.status(404).send("response not saved! please retry after some time");
    }
    )
});

app.post('/join', (req, res) => {
    var resume = new join(req.body);
    resume.save().then(() => {
        res.status(200).send("response saved to database");
    }).catch(() => {
        res.status(404).send("response not saved! please retry after some time");
    }
    )
});


  
  

app.listen(port, hostname, () => {
    console.log(`The app is listening at http://${hostname}:${port}/`);
});