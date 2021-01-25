const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');


const app = express();

mongoose
        .connect(process.env.DATABASE,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true})
        .then(() => { console.log('DB conected')});


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


if(process.env.NODE_ENV==='development'){

    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}

app.use('/api',blogRoutes);
app.use('/api',authRoutes);


app.get('/api',(req,res)=>{
    res.json({time: Date().toString()});
})











const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log('server is running on port: ${port}');
})

