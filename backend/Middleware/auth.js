const jwt = require("jsonwebtoken");

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  Access_Expiry,
} = require("../env");

const verifyAccessToken = (token) => {
  //checking for provided token
  if (!token) {
    return { valid: false, port: "401" };
  }
  // verify token
  return jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return { valid: false, port: "401" };
    } else {
      return { valid: true, decoded: decoded, port: 200 };
    }
  });
};

const refreshAccessToken = (refreshToken) => {
  //checking for provided token

  // verify token
  return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw "Invalid refresh token";
    }

    // Check if the refresh token is associated with a valid user (in real-world scenario, you might check a database)
    delete decoded.iat;
    delete decoded.exp;
    // Generate a new access token
    const accessToken = jwt.sign(decoded, ACCESS_TOKEN_SECRET, {
      expiresIn: Access_Expiry,
    });

    // Respond with the new access token
    return { token: accessToken };
  });
};

const extractToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Bearer token is missing" });
  }

  req.token = token;
  next();
};

const checkHr = (req, res, next) => {
  try {
    const decodedToken = verifyAccessToken(req.token);
    if (decodedToken.valid && decodedToken.decoded.designation === "HR") {
      delete req.token;
      next();
    } else {
      return res.status(403).json({ error: "Access denied. Contact admin." });
    }
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

const checkEmployee = (req, res, next) => {
  try {
    const decodedToken = verifyAccessToken(req.token);
    if (decodedToken.valid && decodedToken.decoded.designation === "Employee") {
      delete req.token;
      next();
    } else {
      return res.status(403).json({ error: "Access denied. Contact admin." });
    }
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

const check = (req, res, next) => {
  try {
    const decodedToken = verifyAccessToken(req.token);
    if (decodedToken.valid) {
      delete req.token;
      next();
    } else {
      return res.status(403).json({ error: "Access denied. Contact admin." });
    }
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = {
  verifyAccessToken,
  refreshAccessToken,
  extractToken,
  check,
  checkEmployee,
  checkHr,
};
