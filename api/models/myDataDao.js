const { AppDataSource } = require("./dataSourceMyData");

const getHistoriesByCI = async (CI, providerID) => {
  try {
    const updateHistories = await AppDataSource.query(
      `
      UPDATE histories
      SET 
        is_get = 1
      WHERE is_get = 0 AND CI = ? AND provider_id IN (?)
      `,
      [CI, providerID]
    );

    const updatedRows = updateHistories.affectedRows;

    if (updatedRows <= 0) throw new Error("NO_RECORDS");

    const results = await AppDataSource.query(
      `
      SELECT
        id,
        created_at AS createdAT,
        user_name AS userName,
        provider_id AS providerID, 
        category_id AS categoryID, 
        is_monthly AS isMonthly, 
        amount, 
        transaction_note AS transactionNote, 
        account_number 
      FROM histories
      WHERE 
        is_get = 1
        AND CI = ?
        AND provider_id IN (?)
      ORDER BY id
      `,
      [CI, providerID]
    );
    return results;
  } catch {
    const error = new Error("NO_RECORDS");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  getHistoriesByCI,
};
