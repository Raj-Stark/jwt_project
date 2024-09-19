const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const UnAuthenticatedError = require("../errors/index");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnAuthenticatedError("No Token Provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    throw new CustomAPIError("Not Authorized", 401);
  }
};

module.exports = authenticationMiddleware;
