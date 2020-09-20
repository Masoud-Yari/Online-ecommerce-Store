const jwt = require('jsonwebtoken');

const getToken = (user) => {
    return jwt.sign({
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        isAdmin: user.isAdmin
    }, process.env.TOKEN_SECRET, {expiresIn: '1h'});
}

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        const mainToken = token.slice(7, token.length);
        jwt.verify(mainToken, process.env.TOKEN_SECRET, (error, decode) => {
            if(error) {
                return res.status(401).send({msg: 'Invalid Token!'});
            }else {
                req.user = decode;
                next();
            }
        })
    }else{
        return res.status(401).send({msg: 'Access Denied!'});
    }
}

const adminVerify = (req, res, next) => {
    const token = req.user;
    if(token.isAdmin) {
        next();
    }else {
        res.status(500).send({msg: 'Admin Access!'});
    }
}

module.exports = {
    getToken, auth, adminVerify
}