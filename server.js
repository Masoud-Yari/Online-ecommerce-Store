const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.set('useCreateIndex', true);

const db = process.env.MONGODB_URL || 'mongodb://localhost/my-shop';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, error => {
    if(error) 
        console.log(error);
    else 
        console.log('DB connect...');
});

app.use('/api/products', require('./routes/api/products'));
app.use('/api/users', require('./routes/api/user'));


const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));