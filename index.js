const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./dbconfig/database');
const app = express();

//connect to database
connect.authenticate().then(()=>{
    console.log("Connection OK")
}).catch((err)=>{
    console.log(err);
});

//setting EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/ask', (req,res)=>{
    res.render('ask');
});

app.post('/save', (req,res)=>{
    let tittle = req.body.tittle;
    let question = req.body.question;
    res.send(`${tittle} ${question}`);
});

app.listen(3000,()=>{
    console.log('App Running');
});