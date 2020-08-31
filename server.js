const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//connection to mongoDB
mongoose.connect('mongodb+srv://admin:admin123@chartapp.tlhdk.gcp.mongodb.net/chartDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
    console.log('error' + err);
});

mongoose.connection.once('open', ()=>{
    console.log('The connection to MongoDB is working.');
});

//set up web server to parse info from web browser
app.use(express.json());

//static web server
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('/api/savechart', require('./routes/save.js'));
app.use('/api/readchart', require('./routes/read.js'));

/*route: everytime the user visits any URL address then 
file index html will display to the browser*/

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

//set up port
app.listen(4000, () => {
    console.log('Listening at localhost:4000')
});

