const Session = require('../models/sessionModel.js');

const sessionController = {};

// setSSIDCookie for when a user logs in
// This creates a session document in the database with that SSID. It will expire after a certain amount of time
// This also sets a cookie for the user with that ssid.
sessionController.setSSID = (req, res, next) => {
  const random = Math.floor(Math.random() * 100000);
  res.cookie('SSID', random);
  try {
    Session.create({ random });
    return next();
  } catch {
    const err = {
      log: 'Error in sessionController.setSSID middleware',
      message: { err: 'There was an issue authenticating user.' },
    };
    return next(err);
  }
};

// verifySSID for anytime a user goes to a new page
// This will check that there is a session document in the database with an SSID that matches the user's cookie.
sessionController.verifySSID = (req, res, next) => {};

export default sessionController;
