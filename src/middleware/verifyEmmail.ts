import NodeMailer from 'nodemailer'
import { nanoid } from 'nanoid'
import config from 'config'
import {createMailTransporter} from '../utils/createMailTransporter'


export const sendVerificationEmail = (user:any, res:any) => {
  const transporter = createMailTransporter();

  const currentUrl = config.get('adminSiteUrl');

  const mailOptions:NodeMailer.SendMailOptions = {
    from : config.get('authEmail'),
    to: user.email,
    subject: 'Verify your email',
    html: `<p>Hello ${user.name}, verify your email by click link...</p>
    <a href="${currentUrl}/verify-email?emailToken=${user.emailToken}">Verify Email</a>` 
}

  transporter.sendMail(mailOptions, (error:any, info) =>{
    if(error){
      console.log(error);
      res.status(500).json({
        status: 'fail',
        message: 'Something went wrong'
      })
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        status: 'success',
        message: 'Email sent'
      })
    }   
  })


}