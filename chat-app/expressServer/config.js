require('dotenv').config()

module.exports = {
    development: {
		host: process.env.HOST,
		secureHost: process.env.SECURE_HOST,
        port: process.env.PORT || 3000,
		securePort: process.env.SECURE_PORT || 3443,
		secretKey: process.env.JWT_SECRET_KEY,
		mongoUrl : process.env.MONGO_LOCAL_CONN_URL,
		mongoDb: process.env.MONGO_DB_NAME
    }
}