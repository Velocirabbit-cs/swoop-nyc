const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'denniscorsi@gmail.com',
    pass: 'feso hmve jhqi erxk',
  },
});

const mailOptions = {
  from: 'denniscorsi@gmail.com',
  to: 'swoopnyc@yahoo.com',
  subject: 'Welcome to Swoop!',
  text: "Get swoopin'!",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) console.log('Error sending mail:', error);
  else console.log('Email sent!', info);
});
