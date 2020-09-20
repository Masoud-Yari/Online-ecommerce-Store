const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.set('useCreateIndex', true);

const db = process.env.MONGODB_URL;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, error => {
    if(error) 
        console.log(error);
    else 
        console.log('DB connect...');
});

app.use('/api/products', require('./routes/api/products'));
app.use('/api/users', require('./routes/api/user'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));