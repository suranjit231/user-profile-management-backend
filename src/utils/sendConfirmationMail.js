import nodemailer from "nodemailer";

//============ function for sending signup confirmation email ==========================//
export default async function sendConfirmationEmail(email, username, confirmationLink) {

    //=========== create transporter for sending email ============//
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER, //==== application email 
            pass: process.env.EMAIL_PASS, //==== application password
        },
    });

    //======== craete mail options =====//
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Account Confirmation',
        html: `<h1>Welcome, ${username}</h1><p>Please confirm your account by clicking the link below:</p><a href="${confirmationLink}">Confirm Account</a>`,
    }

    try {
        //======= send email ====//
        const info = await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent: ', info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}
