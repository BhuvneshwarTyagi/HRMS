const jwt = require("jsonwebtoken");

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  Access_Expiry,
} = require("../env");

const verifyAccessToken = (token) => {

  if (!token) {
    return { valid: false, port: "401" };
  }

  return jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return { valid: false, port: "401" };
    } else {
      return { valid: true, decoded: decoded, port: 200 };
    }
  });
};

const refreshAccessToken = (refreshToken) => {

  return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw "Invalid refresh token";
    }

    delete decoded.iat;
    delete decoded.exp;
    const accessToken = jwt.sign(decoded, ACCESS_TOKEN_SECRET, {
      expiresIn: Access_Expiry,
    });

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
      req.id = decodedToken.decoded.id;
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
      req.id = decodedToken.decoded.id;
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
      req.id = decodedToken.decoded.id;
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
