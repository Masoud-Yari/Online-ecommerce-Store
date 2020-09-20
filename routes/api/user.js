const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const {getToken} = require('../../token');

const router = express.Router();

router.post('/signin', async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(401).send({msg: 'Email does not exist!'});

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isValidPassword) return res.status({msg: 'Password is incorrect'});

        
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: getToken(user)
        });
        
    } catch (error) {
        res.status(401).send(error.message);
    }
});

router.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            name: 'masoud',
            email: 'masoud@gmail.com', 
            password: '1234',
            isAdmin: true
        });
    
        const admin = await user.save();
        res.send(admin);

    } catch (error) {
        res.status(401).send(error.message);
    }
});

router.post('/register', async (req, res) => {
    try {
        const isExisted = await User.findOne({email: req.body.email});
        if(isExisted) return res.send({msg: 'Email already registered!'});
        if(req.body.password !== req.body.rePassword) return res.send({msg: 'Make sure confirmed password is correct.'});

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email, 
            password: hashedPassword
        });
        
        const user = await newUser.save();
        res.send({user});

    } catch (error) {
        res.status(401).send({msg: 'Error on registering user!'})
    }
});

module.exports = router;