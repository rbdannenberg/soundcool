const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: function(user) {
    var u = {
      name: user.name,
      id: user.user_id
    };
    let token = jwt.sign(u, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    })
    return token;
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
