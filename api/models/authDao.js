const { AppDataSource } = require("./dataSource");

const getCIByPhoneNumber = async (phoneNumber) => {
  try {
    const [result] = await AppDataSource.query(
      `
        SELECT
        phone_number AS phoneNumber, CI
        FROM identities
        WHERE phone_number = ?
      `,
      [phoneNumber]
    );

    return result;
  } catch {
    const error = new Error("AppDataSource Error #getCIByPhoneNumber");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  getCIByPhoneNumber,
};
