const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: function(user) {
    var u = {
      name: user.name,
      id: user.user_id
    };
    return (token = jwt.sign(u, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    }));
  },

  verifyToken: function(token, callback) {
    jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
      if (err) {
        callback(false);
      } else {
        callback(user);
      }
    });
  }
};

// correct way to validate
// app.use(function(req, res, next) {
//     // check header or url parameters or post parameters for token
//     var token = req.headers['authorization'];
//     if (!token) return next(); //if no token, continue

//     token = token.replace('Bearer ', '');

//     jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
//       if (err) {
//         return res.status(401).json({
//           success: false,
//           message: 'Please register Log in using a valid email to submit posts'
//         });
//       } else {
//         req.user = user; //set the user to req so other routes can use it
//         next();
//       }
//     });
//   });
