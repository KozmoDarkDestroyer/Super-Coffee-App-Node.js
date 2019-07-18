const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

let verifyToken = (req,res,next) =>{
    let token = req.get('token');
    jwt.verify(token,config.authJwtSecret,(err,payload) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        req.user = payload;
        next();
    })
}

let verifyRole = (req,res,next) =>{
    let user = req.user;
    if (user.role == 'ADMIN_ROLE') {
        next();
    }
    else{
        res.status(401).json({
            ok: false,
            err:{
                message: 'unauthorized user'
            }
        })
    }
}

module.exports = {
    verifyToken,
    verifyRole
}