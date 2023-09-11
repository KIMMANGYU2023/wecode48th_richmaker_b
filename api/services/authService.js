const { authDao } = require("../models");

const getCIByPhoneNumber = async (phoneNumber) => {
  return await authDao.getCIByPhoneNumber(phoneNumber);
};

module.exports = {
  getCIByPhoneNumber,
};
