const { myDataService } = require("../services");
const { catchAsync } = require("../utils/error");

const sendHistories = catchAsync(async (req, res) => {
  const { CI, providerID } = req.body;

  if (!CI || !providerID) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  try {
    const histories = await myDataService.getHistoriesByCI(CI, providerID);

    res.status(200).json({ data: histories });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
});

module.exports = {
  sendHistories,
};
