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
                expiresIn: '1h'
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
            return jwt.verify(token, process.env.SIGN_TOKEN);
        } 
        else
        {
        	console.log("ca marche pas ")
            return null;
        }
    },

    Relog : function(email,password)
    {
        fetch("http://localhost:3000/api/users/login", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				if (data.hasOwnProperty('error')) {
					console.log(data.error);
					document.getElementById("invalid-input-alert").classList.remove("d-none");
					document.getElementById("error-text").innerHTML = data.error;
				}
				else {
					document.getElementById("invalid-input-alert").classList.add("d-none")
					var data = JSON.parse(JSON.stringify(data));

					// Exiration date
					let date = new Date(Date.now() + 86400000); //86400000ms = 1 jour
					date = date.toUTCString();

					// Cookie
					document.cookie = "token=" + data.token + ";" + "expires=" + date;
				}
			})
    }
}