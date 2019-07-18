
require('dotenv').config();

const config = {
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    port: process.env.PORT = process.env.PORT || 3000,
    expiration: process.env.TOKEN_EXPIRATION,
    database:{
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
};

module.exports = {
    config
}