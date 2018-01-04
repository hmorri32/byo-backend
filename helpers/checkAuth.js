const jwt = require("jsonwebtoken");
const app = require("../server");

exports.checkAuth = (request, response, next) => {
  const token =
    request.body.token ||
    request.param("token") ||
    request.headers["authorization"];
  if (token) {
    jwt.verify(token, app.get("secretKey"), (error, decoded) => {
      if (error) {
        return response.status(403).send({
          success: false,
          message: "Invalid authorization token."
        });
      } else {
        request.decoded = decoded;
        next();
      }
    });
  } else {
    return response.status(403).send({
      success: false,
      message: "you must be authorized to hit this yung endpoint"
    });
  }
};
