/**
 * RBAC Middleware
 * Usage: authorize('candidates', 'edit')
 * Checks if req.user's role has the given action on the given module.
 */
const authorize = (module, action) => {
  return (req, res, next) => {
    try {
      const role = req.user?.role;
      if (!role) {
        return res.status(403).json({ success: false, message: 'No role assigned to user.' });
      }

      const permission = role.permissions?.find(p => p.module === module);
      if (!permission || !permission.actions.includes(action)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Role '${role.name}' cannot perform '${action}' on '${module}'.`
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Authorization check failed.' });
    }
  };
};

/**
 * Restrict access to specific role codes.
 * Usage: restrictTo('super_admin', 'hr_admin')
 */
const restrictTo = (...roleCodes) => {
  return (req, res, next) => {
    const userRoleCode = req.user?.role?.code;
    if (!roleCodes.includes(userRoleCode)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. This action requires one of: ${roleCodes.join(', ')}.`
      });
    }
    next();
  };
};

module.exports = { authorize, restrictTo };
