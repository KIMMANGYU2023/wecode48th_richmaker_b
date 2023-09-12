const { myDataDao } = require("../models");

const getHistoriesByCI = async (CI, providerID) => {
  const histories = await myDataDao.getHistoriesByCI(CI, providerID);

  return histories;
};

module.exports = {
  getHistoriesByCI,
};
