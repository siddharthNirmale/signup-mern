const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.header("authorization");

  if (!authHeader) {
    return res.status(403).json({
      message: "Unauthorized — JWT token is required",
    });
  }

  try {
    // If header looks like "Bearer <token>", split it
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Verify the token using jwt.verify (not JsonWebTokenError)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach decoded payload to request
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized — JWT token is invalid or expired",
    });
  }
};

module.exports = ensureAuthenticated;
