const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "44ebd73f46c9db4b3510dd68cb104f20-10eedde5-05b25695",
    domain: "sandbox7baab0e384404a6dba2636f4eb27bae4.mailgun.org",
  },
};
const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, number, cb) => {
    const mailOptions = {
        sender: name,
        from: email,
        to: 'jaykhansme@gmail.com',
        
    };
    transporter.sendMail(mailOptions, function(err, data, cb) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

// Exporting the sendmail
module.exports = sendMail;