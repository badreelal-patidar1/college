let jwt = require('jsonwebtoken');
 const secret="onemanarmy";

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
  }

  if (token) {
    
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({
          status: false,
          code: 401,
          message: 'Token is not valid or expire!'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      status: false,
      code: 401,
      message: 'Please provide auth token'
    });
  }
};

module.exports = {
  checkToken: checkToken
}