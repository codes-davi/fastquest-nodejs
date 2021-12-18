const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./dbconfig/database');
const QuestionModel = require('./dbconfig/Question');
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

    QuestionModel.findAll({raw: true, order:[['id','DESC']]}).then((questions) => {
        res.render('index', {
            questions: questions
        });
    });
});

app.get('/ask', (req,res)=>{
    res.render('ask');
});

app.post('/save', (req,res)=>{
    let title = req.body.title;
    let description = req.body.description;
    
    //insert into questions
    QuestionModel.create({
        title: title,
        description: description
    }).then(()=>{
        res.redirect("/");
    }).catch((err)=>{
        console.log(err);
    });
});

app.listen(3000,()=>{
    console.log('App Running');
});