const validate = require('./schema/user.schema');

exports.userRegister = (req, res, next) => {
  try {
    const { value, error } = validate.userCreation.validate(req.body);
    if (error) {
      return res.send({
        status: 400,
        message:
          'Validation failed - ' + error.message.replace(/(\"|\[|\d\])/g, ''),
        response: {},
      });
    }
    req.body = value;
    next();
  } catch (e) {
    return res.send({ error: e.message.toString() });
  }
};

exports.userVerify = (req, res, next) => {
  try {
    const { value, error } = validate.verifyUser.validate(req.body);
    if (error) {
      return res.send({
        status: 400,
        message:
          'Validation failed - ' + error.message.replace(/(\"|\[|\d\])/g, ''),
        response: {},
      });
    }
    req.body = value;
    next();
  } catch (e) {
    return res.send({ error: e.message.toString() });
  }
};

exports.login = (req, res, next) => {
  try {
    const { value, error } = validate.login.validate(req.body);
    if (error) {
      return res.send({
        status: 400,
        message:
          'Validation failed - ' + error.message.replace(/(\"|\[|\d\])/g, ''),
        response: {},
      });
    }
    req.body = value;
    next();
  } catch (e) {
    return res.send({ error: e.message.toString() });
  }
};

exports.login2FA = (req, res, next) => {
  try {
    const { value, error } = validate.login2FA.validate(req.body);
    if (error) {
      return res.send({
        status: 400,
        message:
          'Validation failed - ' + error.message.replace(/(\"|\[|\d\])/g, ''),
        response: {},
      });
    }
    req.body = value;
    next();
  } catch (e) {
    return res.send({ error: e.message.toString() });
  }
};
