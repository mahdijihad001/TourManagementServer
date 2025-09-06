import nodemailer from "nodemailer";
import { envVar } from "../config/env";
import path from "path";
import ejs from "ejs";
import AppError from "../errorHelpers/app.error";

const transport = nodemailer.createTransport({
    secure: true,
    auth: {
        user: envVar.EMAIL_SENDER.SMTP_USER,
        pass: envVar.EMAIL_SENDER.SMTP_PASS
    },
    port: Number(envVar.EMAIL_SENDER.SMTP_PORT),
    host: envVar.EMAIL_SENDER.SMTP_HOST
});

interface sendEmailsOptions {
    to: string,
    subject: string,
    templateName?: string,
    templateData?: Record<string, any>
    attachments?: {
        filename: string,
        content: Buffer | string,
        contentType: string
    }[]
};

export const sendEmail = async ({ to, subject, templateName, templateData, attachments }: sendEmailsOptions) => {
    try {

        const templatePath = path.join(__dirname, `templates/${templateName}.ejs`);

        const html = await ejs.renderFile(templatePath, templateData);

        const info = await transport.sendMail({
            from: envVar.EMAIL_SENDER.SMTP_FORM,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments?.map((item) => ({
                filename: item.filename,
                content: item.content,
                contentType: item.contentType
            }))
        });

        console.log(`/21131/ Email send to ${to} : ${info.messageId}`);

    } catch (error) {
        console.log(`Email Error`);
        throw new AppError(400, "Email otp send faild.");
    }
};