// Imports
const { RequestHeaderFieldsTooLarge } = require('http-errors');
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = process.env.SIGN_TOKEN;

// Exported functions
module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
            JWT_SIGN_SECRET,
            {
                expiresIn: '24h'
            })
    },
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function (authorization) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    userId = jwtToken.userId;
            } catch (err) { }
        }
        return userId;
    },

    checktoken : function(token)
    {
        if (token != null) 
        {
        	console.log("verified");
            console.clear()
            console.log(jwt.verify(token, process.env.SIGN_TOKEN))
            return jwt.verify(token, process.env.SIGN_TOKEN);
        } 
        else
        {
        	console.log("ca marche pas ")
            return null;
        }
    }

}