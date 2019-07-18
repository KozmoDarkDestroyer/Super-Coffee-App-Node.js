module.exports = {
    createCategory:'INSERT INTO categories SET ?',

    updateCategory:'UPDATE categories set ? WHERE id_categories = ?',

    getCategories:'SELECT users.id_users, users.name_users, users.email, categories.id_categories, categories.name_categories FROM categories INNER JOIN users ON categories.id_users = users.id_users LIMIT 20',

    getCategory:'SELECT *FROM categories WHERE id_categories = ?',

    deleteCategory:'DELETE FROM categories WHERE id_categories = ?',
    
    searchCategories:'SELECT name_categories, id_categories, id_users FROM categories WHERE name_categories REGEXP ?'
}