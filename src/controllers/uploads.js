const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const path = require('path');
const User = require('../db/querys/user');
const Product = require('../db/querys/products');
const db = require('../db/database');
const { assignmentProductsImage, assignmentUserImage } = require('../functions/assignment');

app.use(fileUpload({ useTempFiles: true })); 

app.put('/upload/:type/:id', function(req, res) {
    let type = req.params.type;
    let id = req.params.id;
    if (!req.files) {
        return res.status(400).json({ 
            ok: false,
            err: {
                message: `No file selected`
            }
        })
    }
    console.log(type)
    let validTypes = ['products', 'users']; 
    if (validTypes.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            error: {
                message: `The allowed types are: ` + validTypes.join(', ')
            }
        })
    }

    let file = req.files.file; 
    let trimmedName = file.name.split('.'); 
    let extension = trimmedName[trimmedName.length - 1]; 
    let validExtensions = ['png', 'jpg', 'gif', 'jpeg']; 

    if (validExtensions.indexOf(extension) < 0) { 
        return res.status(400).json({
            ok: false,
            error: {
                message: `The allowed extensions are: ` + validExtensions.join(', ')
            }
        })
    }

    let fileName = `${ id }-${ new Date().getMilliseconds() }.${ extension }`; 

    file.mv(`uploads/${ type }/${ fileName }`, (err) => { 
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        if (type == 'users') {
            imageUser(id, res, fileName, type);
        } else if (type == 'products') {
            imageProduct(id, res, fileName, type);
        }
    })
});

function imageUser(id, res, fileName, type) {
    db.query(User.getUser,[id],(err,result) =>{
        if (err) {
            deleteFile(fileName,type);
            res.status(500).json({
                ok: false,
                err
            })
        }
        else if (result.length == 0 || result == null) {
            deleteFile(fileName,type);
            res.status(404).json({
               ok: false,
               err
            }) 
        }

        deleteFile(result[0].img_users,type);
        result[0].img_users = fileName;
        let user = assignmentUserImage(result[0]);

        db.query(User.updateUser,[user,id],(err,result)=>{
            if (err) {
                return res.status(500).json({
                    ok: false,
                    result
                })
            }
            else if (result.length == 0 || result == null) {
               return res.status(404).json({
                   ok: false,
                   result
               }) 
            }
            res.status(200).json({
                ok: true,
                user
            })
        })  

    })
}

function imageProduct(id, res, fileName, type) {
    db.query(Product.getProduct,[id],(err,result) =>{
        if (err) {
            deleteFile(fileName,type);
            res.status(500).json({
                ok: false,
                err
            })
        }
        else if (result.length == 0 || result == null) {
            deleteFile(fileName,type);
            res.status(404).json({
               ok: false,
               err
            }) 
        }

        deleteFile(result[0].img_products,type);
        result[0].img_products = fileName;
        let product = assignmentProductsImage(result[0]);

        db.query(Product.updateProduct,[product,id],(err,result)=>{
            if (err) {
                return res.status(500).json({
                    ok: false,
                    result
                })
            }
            else if (result.length == 0 || result == null) {
               return res.status(404).json({
                   ok: false,
                   result
               }) 
            }
            res.status(200).json({
                ok: true,
                product
            })
        })  

    })
}

function deleteFile(imageName, type) {
    let pathImage = path.resolve(__dirname, `../../uploads/${ type }/${ imageName }`) // -> Path de la imagen en la base de datos

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage)
    }
}

module.exports = app;