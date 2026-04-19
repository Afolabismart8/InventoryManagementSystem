const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "Error",
        message: "You are not allowed to access this resource"
      });
    }

    next();
  };
};

module.exports = { authorizedRoles };