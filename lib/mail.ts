import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'suleclaw@gmail.com',
    pass: process.env.SMTP_PASS || '',
  },
});

export interface EnquiryEmailData {
  name: string;
  email: string;
  productInterest?: string;
  message: string;
}

export async function sendEnquiryEmail(data: EnquiryEmailData): Promise<void> {
  const toEmail = process.env.ENQUIRY_EMAIL || 'hello@printsbytee.co.uk';
  
  const mailOptions = {
    from: process.env.SMTP_USER || 'suleclaw@gmail.com',
    to: toEmail,
    subject: `New Enquiry from ${data.name}${data.productInterest ? ` - ${data.productInterest}` : ''}`,
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0D0D0D, #1B4D3E); padding: 30px; text-align: center;">
          <h1 style="color: #C9A84C; margin: 0; font-size: 28px;">New Enquiry — PrintsbyTee</h1>
        </div>
        <div style="padding: 30px; background: #F5F0E8;">
          <div style="margin-bottom: 20px; padding: 15px; background: white; border-left: 4px solid #C9A84C;">
            <p style="margin: 5px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</p>
            <p style="margin: 0; font-size: 18px; color: #0D0D0D;">${data.name}</p>
          </div>
          <div style="margin-bottom: 20px; padding: 15px; background: white; border-left: 4px solid #1B4D3E;">
            <p style="margin: 5px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
            <p style="margin: 0; font-size: 18px; color: #0D0D0D;"><a href="mailto:${data.email}">${data.email}</a></p>
          </div>
          ${data.productInterest ? `
          <div style="margin-bottom: 20px; padding: 15px; background: white; border-left: 4px solid #C75B39;">
            <p style="margin: 5px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Product Interest</p>
            <p style="margin: 0; font-size: 18px; color: #0D0D0D;">${data.productInterest}</p>
          </div>
          ` : ''}
          <div style="padding: 15px; background: white; border-left: 4px solid #C9A84C;">
            <p style="margin: 5px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="margin: 0; font-size: 16px; color: #0D0D0D; line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        <div style="padding: 20px; text-align: center; background: #0D0D0D; color: #C9A84C; font-size: 12px;">
          Sent via printsbytee.co.uk
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}