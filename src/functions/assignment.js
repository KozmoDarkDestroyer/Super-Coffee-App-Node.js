const bcrypt = require('bcrypt');

let assignmentUserPost = ( body ) =>{
    let model = {
        name_users: body.name_users,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        img_users: body.img_users,
        role: body.role,
        status_users: body.status_users
    }
    return model;
}

let assignmentUserPut = ( body ) =>{
    let model = {
        name_users: body.name_users,
        password: bcrypt.hashSync(body.password,10),
        img_users: body.img_users,
        role: body.role,
        status_users: body.status_users
    }
    return model;
}

let assignmentUserImage = ( body ) =>{
    let model = {
        name_users: body.name_users,
        img_users: body.img_users,
        role: body.role,
        status_users: body.status_users
    }
    return model;
}

let assignmentProducts= ( body ) =>{
    let model = {
        name_products: body.name_products,
        description_products: body.description_products,
        id_users: body.id_users,
        id_categories: body.id_categories,
        price_uni_products: body.price_uni_products,
        available_products: body.available_products
    }
    return model;
}

let assignmentProductsImage = ( body ) => {
    let model = {
        name_products: body.name_products,
        description_products: body.description_products,
        id_users: body.id_users,
        id_categories: body.id_categories,
        price_uni_products: body.price_uni_products,
        available_products: body.available_products,
        img_products: body.img_products
    }
    return model;
}

let assignmentCategories = ( body ) =>{
    let model = {
        name_categories:body.name_categories,
        id_users: Number(body.id_users)
    }
    return model;
}

module.exports = {
    assignmentUserPost,
    assignmentUserPut,
    assignmentProducts,
    assignmentCategories,
    assignmentProductsImage,
    assignmentUserImage
}