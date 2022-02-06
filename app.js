const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const tasks = require('./routes/tasks');
const noteRouter = require('./routes/note');
// Connect To Database
mongoose.connect(config.database,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});
mongoose.connection.on(`connected`,()=>{
    console.log(`Connected to database`+config.database);
})
mongoose.connection.on(`error`,(err)=>{
    console.log(`database error`+err);
})

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

//Tasks

app.use('/api',tasks);

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});

// notes 
app.use(express.json());
app.use(noteRouter);


