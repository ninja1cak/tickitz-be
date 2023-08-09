const nodemailer = require('nodemailer')
require('dotenv/config')


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
})



const configSendaMail =  (email, confirmationCode) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: 'subject',
    text: `Open this link for account verification: localhost:3000/login/${confirmationCode} `
  }
  transporter.sendMail(mailOptions,( error, info) => {
    if(error){
      console.log(error);
    }else{
      console.log('email sent:', info.response)
    }
  } )
}


module.exports = configSendaMail