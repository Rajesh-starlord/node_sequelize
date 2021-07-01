const jwt = require('jsonwebtoken');
require('dotenv').config();

const getToken = function (user) {
  let jwtSecretKey = process.env.APP_SECRET;
    let data = {
        time: Date(),
        userId: user.userid,
    }
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}

const Authenticate = function (req,res,next) {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.APP_SECRET;
    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            next();
        } else {
            // Access Denied
            return res.status(401).send({ Message: 'access denied' });
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send({ Message: 'access denied' });
    }
}

module.exports = { Authenticate, getToken };
