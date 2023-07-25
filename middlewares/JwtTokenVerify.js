const jwt =require("jsonwebtoken");
const JwtToken = require("../models/JwtToken");

async function JwtTokenVerify(req, res, next) {
  const auhorizationHeader = req.headers.authorization;
  let result;

  if (!auhorizationHeader || auhorizationHeader == '') {
    return res.status(401).json({
      error: true,
      message: "Access token is missing",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {

    const jwt_token = await JwtToken.findOne({$and:[{access_token:token}, {is_active:true}, {deleted_at:null}]});

    if (!jwt_token) {
      return res.status(403).json({
        error: true,
        message: "Invalid token",
      });
    }

    result = await jwt.verify(token, jwt_token.token_secret, {expiresIn: jwt_token.expires_in});

    req.decoded = result;

    next();

  } catch (error) {

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        error: true,
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        error: true,
        message: "Token expired",
      });
    }

    return res.status(403).json({
      error: true,
      message: "Authentication error",
    });

  }
}

module.exports = JwtTokenVerify;