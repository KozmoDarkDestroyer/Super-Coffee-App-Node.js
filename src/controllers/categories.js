const express = require('express');
const db = require('../db/database');
const { verifyToken, verifyRole } = require('../middlewares/authentication');
const app = express();
const Category = require('../db/querys/categories');
const { assignmentCategories } = require('../functions/assignment');

app.get('/categories/:limit',[ verifyToken ],(req,res) =>{
    let limit = Number(req.params.limit);
    db.query(Category.getCategories
    ,[limit],(err,result) =>{
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

app.get('/categories/search/:param',[ verifyToken ],(req,res) =>{
    let param = req.params.param;
    db.query(Category.searchCategories,[param],(err,result) =>{
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

app.get('/category/:id',[ verifyToken ],(req,res) =>{
    let id = req.params.id;
    db.query(Category.getCategory,[id],(err,result) =>{
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

app.post('/category',[ verifyToken, verifyRole  ],(req,res) =>{
    let category = assignmentCategories(req.body);
    db.query(Category.createCategory,[category],(err,result) =>{
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
    })
})

app.put('/category/:id',[ verifyToken, verifyRole ],(req,res) =>{
    let id = req.params.id;
    let category = assignmentCategories(req.body);
    db.query(Category.updateCategory,[category,id],(err,result) =>{
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

app.delete('/category/:id',[ verifyToken, verifyRole ],(req,res) =>{
    let id = Number(req.params.id);
    db.query(Category.deleteCategory,[id],(err,result) =>{
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

module.exports = app;