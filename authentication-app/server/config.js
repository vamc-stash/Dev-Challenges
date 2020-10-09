require('dotenv').config()

module.exports = {
	development: {
		port: process.env.PORT || 3000,
		securePort: process.env.SECURE_PORT || 3443,
		secretKey: process.env.JWT_SECRET_KEY,
		mongoUrl : process.env.MONGO_LOCAL_CONN_URL,
		mongoDb: process.env.MONGO_DB_NAME,
		facebook: {
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			callbackURL: `${process.env.SECURE_HOST}/facebook/callback`
		},
		github: {
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET
		},
		google: {
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		},
		twitter: {
			clientID: process.env.TWITTER_CLIENT_ID,
			clientSecret: process.env.TWITTER_CLIENT_SECRET
		}
	}
}