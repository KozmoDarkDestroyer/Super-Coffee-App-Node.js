module.exports = {
    createUser:'INSERT INTO users set ?',

    updateUser:'UPDATE users set ? WHERE id_users = ?',

    getUsers:'SELECT id_users, name_users, email, role, status_users, img_users FROM users LIMIT ?',

    getUser:'SELECT id_users, name_users, email, role, status_users, img_users FROM users WHERE id_users = ?',

    deleteUser:'UPDATE users SET status_users = ? WHERE id_users = ?',
    
    searchUser:'SELECT id_users, name_users, email, role, status_users, img_users FROM users WHERE name_users REGEXP ? OR email REGEXP ? OR role REGEXP ?'
}