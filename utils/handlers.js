const { HELPER } = require("../helpers");

// for returning the success response
const success = (
  res,
  message = HELPER.RESPONSE_MESSAGES.OK,
  data
) => {
  return res
    .status(200)
    .json({ message, data });
};

//for returning the error response
const failure = (res, err, attempts) => {
  return res.status(err?.code || 500).json({
    message: err?.message || err || HELPER.RESPONSE_MESSAGES.OOPS,
    attempts,
  });
};


module.exports = {
  success,
  failure
};