import dotenv from "dotenv";

dotenv.config();

interface EnvInterfaces {
    port: string,
    mongo_url: string,
    node_env: string,
    ACCESS_SECRATE: string,
    ACCESS_EXPIERS: string,
    REFRESH_SECRATE: string,
    REFRESH_EXPIRED: string,
    SUPER_ADMIN_EMAIL: string,
    SUPER_ADMIN_PASSWORD: string,
    GOOGLE_CLIENT_ID: string,
    GOOGLE_CLIENT_SECRET: string,
    GOOGLE_CALLBACK_URL: string,
    EXPRESS_SESSION_SECRATE: string,
    FRONTEND_URL: string,
    STORE_ID: string,
    STORE_PASSWORD: string,
    SSL_PAYMENT_API: string,
    SSL_VALIDATION_API: string,
    SSL_CLINT_SUCCESS_URL: string,
    SSL_CLINT_FAIL_URL: string,
    SSL_CLINT_CANCEL_URL: string,
    SSL_BACKEND_SUCCESS_URL: string,
    SSL_BACKEND_FAIL_URL: string,
    SSL_BACKEND_CANCEL_URL: string,
    CLOUDINARY: {
        CLOUDINARY_CLOUD_NAME: string,
        CLOUDINARY_API_KEY: string,
        CLOUDINARY_API_SECRATE: string
    },
    EMAIL_SENDER: {
        SMTP_PASS: string,
        SMTP_PORT: string,
        SMTP_FORM: string
        SMTP_USER: string,
        SMTP_HOST: string,
    }
};

const loadEnvVariables = (): EnvInterfaces => {
    const requiredEnvVariables: string[] = ["PORT", "MONGO_URI", "NODE_ENVIRONMENT", "ACCESS_SECRATE", "SUPER_ADMIN_PASSWORD", "SUPER_ADMIN_EMAIL", "ACCESS_EXPIERS", "REFRESH_SECRATE", "REFRESH_EXPIRED", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_CALLBACK_URL", "EXPRESS_SESSION_SECRATE", "FRONTEND_URL", "STORE_ID", "STORE_PASSWORD", "SSL_PAYMENT_API", "SSL_VALIDATION_API", "SSL_CLINT_SUCCESS_URL", "SSL_CLINT_FAIL_URL", "SSL_CLINT_CANCEL_URL", "SSL_BACKEND_SUCCESS_URL", "SSL_BACKEND_FAIL_URL", "SSL_BACKEND_CANCEL_URL", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRATE", "SMTP_PASS", "SMTP_PORT", "SMTP_FORM", "SMTP_USER", "SMTP_HOST"];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variabl ${key}`)
        }
    });

    return {
        port: process.env.PORT as string,
        mongo_url: process.env.MONGO_URI as string,
        node_env: process.env.NODE_ENVIRONMENT as string,
        ACCESS_SECRATE: process.env.ACCESS_SECRATE as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
        ACCESS_EXPIERS: process.env.ACCESS_EXPIERS as string,
        REFRESH_EXPIRED: process.env.REFRESH_EXPIRED as string,
        REFRESH_SECRATE: process.env.REFRESH_SECRATE as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
        EXPRESS_SESSION_SECRATE: process.env.EXPRESS_SESSION_SECRATE as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        STORE_ID: process.env.STORE_ID as string,
        STORE_PASSWORD: process.env.STORE_PASSWORD as string,
        SSL_PAYMENT_API: process.env.SSL_PAYMENT_API as string,
        SSL_VALIDATION_API: process.env.SSL_VALIDATION_API as string,
        SSL_CLINT_SUCCESS_URL: process.env.SSL_CLINT_SUCCESS_URL as string,
        SSL_CLINT_FAIL_URL: process.env.SSL_CLINT_FAIL_URL as string,
        SSL_CLINT_CANCEL_URL: process.env.SSL_CLINT_CANCEL_URL as string,
        SSL_BACKEND_SUCCESS_URL: process.env.SSL_BACKEND_SUCCESS_URL as string,
        SSL_BACKEND_FAIL_URL: process.env.SSL_BACKEND_FAIL_URL as string,
        SSL_BACKEND_CANCEL_URL: process.env.SSL_BACKEND_CANCEL_URL as string,
        CLOUDINARY: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
            CLOUDINARY_API_SECRATE: process.env.CLOUDINARY_API_SECRATE as string,
        },
        EMAIL_SENDER: {
            SMTP_PASS: process.env.SMTP_PASS as string,
            SMTP_PORT: process.env.SMTP_PORT as string,
            SMTP_FORM: process.env.SMTP_FORM as string,
            SMTP_USER: process.env.SMTP_USER as string,
            SMTP_HOST: process.env.SMTP_HOST as string,
        }
    }
}

export const envVar = loadEnvVariables();