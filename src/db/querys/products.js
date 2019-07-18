module.exports = {
    createProduct:'INSERT INTO products SET ?',

    updateProduct:'UPDATE products SET ? WHERE id_products = ?',

    getProducts:'SELECT users.id_users, users.name_users, users.email, categories.id_categories, categories.name_categories, products.id_products, products.name_products,'+
    ' products.description_products, products.price_uni_products FROM products INNER JOIN categories ON products.id_categories ='+
    ' categories.id_categories INNER JOIN users ON products.id_users = users.id_users LIMIT ?',

    getProduct:'SELECT *FROM products WHERE id_products = ?',

    deleteProduct:'UPDATE products SET available_products = ? WHERE id_products = ?',
    
    searchProduct:'SELECT *FROM products WHERE name_products REGEXP ? OR '+
    'description_products REGEXP ?'
}