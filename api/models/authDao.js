const { AppDataSource } = require("./dataSource");

const getCIByPhoneNumber = async (phoneNumber) => {
  const [result] = await AppDataSource.query(
    `
      SELECT
      CI
      FROM identities
      WHERE phone_number = ?
    `,
    [phoneNumber]
  );

  return result;
};

module.exports = {
  getCIByPhoneNumber,
};
