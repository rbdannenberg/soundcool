const jwt = require("jsonwebtoken");
const jwtToken = process.env.JWT_SECRET ? process.env.JWT_SECRET : "soundcool";

module.exports = {
  generateToken: function(user) {
    var u = {
      name: user.name,
      id: user.user_id
    };
    let token = jwt.sign(u, jwtToken, {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    })
    return token;
  },

  verifyToken: function(token, callback) {
    jwt.verify(token, jwtToken, function(err, user) {
      if (err) {
        callback(false);
      } else {
        callback(user);
      }
    });
  }
};
