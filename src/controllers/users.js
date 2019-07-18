const express = require('express');
const db = require('../db/database');
const app = express();
const { verifyToken, verifyRole } = require('../middlewares/authentication');
const User = require('../db/querys/user'); 
const { assignmentUserPost, assignmentUserPut } = require('../functions/assignment');

app.post('/registry',(req,res) =>{
    let user = assignmentUserPost(req.body);
    db.query(User.createUser,[user],(err,result) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.status(201).json({
            ok: true,
            result
        })
    });
})

app.put('/user/:id',[ verifyToken, verifyRole ],(req,res) =>{
    let id = req.params.id;
    let user = assignmentUserPut(req.body);
    db.query(User.updateUser,[user,id],(err,result) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        else if (result.length == 0 || result == null) {
            return res.status(404).json({
                ok: false,
                err:{
                    message: `The id ${ id } does not exist`
                }
            })
        }
        res.status(200).json({
            ok: true,
            result
        })
    })
})

app.get('/users/:limit',[ verifyToken, verifyRole ],(req,res) =>{
    let limit = Number(req.params.limit);
    db.query(User.getUsers,[limit],(err,result) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.status(200).json({
            ok: true,
            result
        })
    })
})

app.get('/user/:id',[ verifyToken ],(req,res) =>{
    let id = Number(req.params.id);
    db.query(User.getUser,[id],(err,result) =>{
        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
        }
        else if (result.length == 0 || result == null) {
            return res.status(404).json({
                ok: false,
                err:{
                    message: `The id ${ id } does not exist`
                }
            })
        }
        res.status(200).json({
            ok: true,
            result
        })
    })
})

app.delete('/user/:id',[ verifyToken ],(req,res) =>{
    let id = Number(req.params.id);
    let status = 0;
    db.query(User.deleteUser,[status,id],(err,result) =>{
        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
        }
        else if (result.length == 0 || result == null) {
            return res.status(404).json({
                ok: false,
                err:{
                    message: `The id ${ id } does not exist`
                }
            })
        }
        res.status(200).json({
            ok: true,
            result
        })
    });
})

app.get('/users/search/:param',[ verifyToken ],(req,res) =>{
    let { param } = req.params;
    db.query(User.searchUser,[param,param,param],(err,result) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.status(200).json({
            ok: true,
            result
        })
    });
})

module.exports = app;
