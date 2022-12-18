const express = require('express');
express.Router();
const api = require('../controller/user.controller');
const validator = require('../validator/user.validator');

module.exports = (router) => {
  router.post('/user/register', validator.userRegister, api.createUser);
  router.post('/user/register/verify', validator.userVerify, api.verify);
  router.post('/user/login', validator.login, api.login);
  router.post('/user/login/verify', validator.login2FA, api.login2FA);
  return router;
};