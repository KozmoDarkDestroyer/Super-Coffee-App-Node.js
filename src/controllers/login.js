const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const bcrypt = require('bcrypt');
const { config } = require('../config/config');
const app = express();

app.post('/login',(req,res) =>{
    let { email, password } = req.body;
    db.query('SELECT *FROM users WHERE email = ?',[email],(err,result) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        else if (result.length == 0 || result == null) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'The user or password is incorrect'
                }
            })
        }
        if (!bcrypt.compareSync(password,result[0].password)) {
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'The user or password is incorrect'
                }
            })
        }
        let payload = {
            email,
            name_users: result[0].name_users,
            id_users: result[0].id_users,
            role: result[0].role
        }
        console.log(payload)
        let token = jwt.sign(payload,config.authJwtSecret,{ expiresIn: config.expiration });
        res.status(200).json({
            ok: true,
            user: payload,
            token
        })
    })
})

module.exports = app;
