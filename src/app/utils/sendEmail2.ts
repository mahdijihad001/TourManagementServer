import nodemailer from "nodemailer";
import { envVar } from "../config/env";


const transport = nodemailer.createTransport({
    secure: true,
    auth: {
        user: envVar.EMAIL_SENDER.SMTP_USER,
        pass: envVar.EMAIL_SENDER.SMTP_PASS
    },
    port: Number(envVar.EMAIL_SENDER.SMTP_PORT),
    host: envVar.EMAIL_SENDER.SMTP_HOST
});

interface sendEmailOptions {
    to: string,
    subject: string,
    template?: string,
    templateData?: Record<string, any>,
    attachments: {
        filename: string,
        content: Buffer | string,
        contentType: string
    }[]
}

const sendEmail = async ({ to, subject, template, templateData, attachments }: sendEmailOptions) => {
    const info = await transport.sendMail({
        from: envVar.EMAIL_SENDER.SMTP_FORM,
        to: "",
        subject: "",
        html: `<h1> Hello Users </h1>`,
        attachments: attachments.map((item) => ({
            filename: item.filename,
            content: item.content,
            contentType: item.contentType
        }))
    })
};