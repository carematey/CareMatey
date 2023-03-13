import sendgrid from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

sendgrid.setApiKey(process.env.SMTP_API_KEY as string);

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
    try {
      console.log("🚀 ~ file: [email].ts:7 ~ sendEmail ~ req:", req.query.email)
    // console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: req.query.email, // Your email where you'll receive emails
      from: "manuarorawork@gmail.com", // your website email address here
      subject: `${req.body.subject}`,
      html: `<div>You've got a mail</div>`,
    });
  } catch (error: any) {
    console.log("🚀 ~ file: [email].ts:16 ~ sendEmail ~ error:", error)
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;