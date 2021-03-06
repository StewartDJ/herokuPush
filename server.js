const express = require('express')
const cors = require('cors') 
const mongoose = require('mongoose')


const app = express();
require('dotenv').config();

const port = process.env.PORT ||  5000;


app.use(cors());
app.use(express.json()); 
app.use(express.static('client/build'));

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true})

const connection = mongoose.connection;
connection.once('open', () => {
console.log('mongoDB database connection established successfully')
})

const exerciseRouter = require('./routes/exercises') 
const usersRouter = require('./routes/users');


app.use('/exercises', exerciseRouter)
 app.use('/users', usersRouter); 


 app.get('*', function (req, res) {
    res.sendFile(__dirname + '/client/build/index.html', function (err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
  

 app.listen(port, () => {
console.log(`server is running on port: ${port}`)
})

