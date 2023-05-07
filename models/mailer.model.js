var nodemailer = require('nodemailer');


let mailer = {};

var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'mifinca.server@outlook.com',
    pass: 'Eimer.13'
  }
});

var mailOptions = {
  from: 'mifinca.server@outlook.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};



mailer.sendEmailTo = function(destination, subject, content){
    mailOptions.to = destination;
    mailOptions.subject = subject;
    mailOptions.text = content;

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

module.exports = mailer;