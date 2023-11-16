const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

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

  console.log('reading file');
  const html = fs.readFileSync(
    path.join(__dirname, '..', '..', 'client', 'welcomeEmail.html')
  );
  console.log('file is read!');

  const mailOptions = {
    from: 'denniscorsi@gmail.com',
    to: email,
    subject: 'Welcome to Stoop!',
    //text: "Get swoopin'!",
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log('Error sending mail:', error);
    else console.log('Email sent!');
  });

  return next();
};

module.exports = emailController;
