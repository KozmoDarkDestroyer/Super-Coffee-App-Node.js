const express = require('express');
const db = require('../db/database');
const { verifyToken, verifyRole } = require('../middlewares/authentication');
const app = express();
const Product = require('../db/querys/products');
const { assignmentProducts } = require('../functions/assignment');

app.post('/product',[ verifyToken, verifyRole ],(req,res) =>{
    let product = assignmentProducts(req.body);
    db.query(Product.createProduct,[product],(err,result) =>{
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

app.put('/product/:id',[ verifyToken, verifyRole ],(req,res) =>{
    let id = req.params.id;
    let product = assignmentProducts(req.body);
    db.query(Product.updateProduct,[product,id],(err,result) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        else if(result.length == 0 || result == null){
            return res.status(500).json({
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

app.delete('/product/:id',[ verifyToken, verifyRole ],(req,res) =>{
    let id = Number(req.params.id);
    let available = 0;
    db.query(Product.deleteProduct,[available,id],(err,result) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        else if(result.length == 0 || result == null){
            return res.status(500).json({
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

app.get('/products/:limit',[ verifyToken ],(req,res)=>{
    let limit = Number(req.params.limit);
    db.query(Product.getProducts,
    [limit],(err,result) =>{
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

app.get('/products/search/:param',[ verifyToken ],(req,res) =>{
    let param = req.params.param;
    db.query(Product.searchProduct,[param,param],(err,result) =>{
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

app.get('/product/:id',[ verifyToken ],(req,res) =>{
    let id = req.params.id;
    db.query(Product.getProduct,[id],(err,result) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        else if(result.length == 0 || result == null){
            return res.status(500).json({
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