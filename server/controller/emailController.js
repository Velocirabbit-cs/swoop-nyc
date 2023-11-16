const nodemailer = require('nodemailer');

const emailController = {};

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'denniscorsi@gmail.com',
    pass: 'feso hmve jhqi erxk', // this is app specific password
  },
});

emailController.sendWelcomeEmail = (req, res, next) => {
  const { email } = req.body;

  const mailOptions = {
    from: 'denniscorsi@gmail.com',
    to: email,
    subject: 'Welcome to Swoop!',
    text: "Get swoopin'!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log('Error sending mail:', error);
    else console.log('Email sent!', info);
  });

  return next();
};

module.exports = emailController;
