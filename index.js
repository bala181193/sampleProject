const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const employeerouter=require('./routers');
const app=express();
port=3000;


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine','ejs');


mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useUnifiedTopology:true});
const db=mongoose.connection;
db.on('error',()=>{console.log('error db connection')});
db.once('open',()=>{
    console.log('db connected');

});

app.use('/',employeerouter);
app.listen(port, () => console.log('server is running'));