const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

//middlewares
app.use(cors());

//body parser
app.use(express.json());

//connection for mongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once("open",()=>{ console.log( "MongoDB Connection established SUcessfully" ) });

const exerciserouter = require("./routes/exercises");
const usersrouter = require( "./routes/users" );

app.use('/exercises',exerciserouter);
app.use('/users',usersrouter);

const port = process.env.PORT || 5000 ;

app.listen(port,() => {console.log(`Server has started at port ${port}`)}); 