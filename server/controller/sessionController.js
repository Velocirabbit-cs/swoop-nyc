const Sessions = require('../models/sessionModel.js');

const sessionController = {};

// setSSIDCookie for when a user logs in
// This creates a session document in the database with that SSID. It will expire after a certain amount of time
// This also sets a cookie for the user with that ssid.
sessionController.setSSID = (req, res, next) => {
  const random = Math.floor(Math.random() * 100000);
  res.cookie('SSID', random);

  Sessions.create({ cookieId: random })
    .then((session) => {
      console.log('RETURNED SESSION:', session);
      return next();
    })
    .catch((err) => {
      console.log('ERROR:', err);
      return next(err);
    });
};

// verifySSID for anytime a user goes to a new page
// This will check that there is a session document in the database with an SSID that matches the user's cookie.
sessionController.verifySSID = (req, res, next) => {
  const { SSID } = req.cookies;
  Sessions.findOne({ cookieId: SSID }).then((session) => {
    if (session) return next();
    else res.redirect('/');
  });
};

module.exports = sessionController;
