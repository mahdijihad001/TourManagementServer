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
    GOOGLE_CLIENT_ID : string,
    GOOGLE_CLIENT_SECRET : string,
    GOOGLE_CALLBACK_URL : string,
    EXPRESS_SESSION_SECRATE : string,
    FRONTEND_URL : string
};

const loadEnvVariables = (): EnvInterfaces => {
    const requiredEnvVariables: string[] = ["PORT", "MONGO_URI", "NODE_ENVIRONMENT", "ACCESS_SECRATE", "SUPER_ADMIN_PASSWORD", "SUPER_ADMIN_EMAIL", "ACCESS_EXPIERS", "REFRESH_SECRATE", "REFRESH_EXPIRED" , "GOOGLE_CLIENT_ID" , "GOOGLE_CLIENT_SECRET" , "GOOGLE_CALLBACK_URL" , "EXPRESS_SESSION_SECRATE" , "FRONTEND_URL"];

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
        GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET as string, 
        GOOGLE_CALLBACK_URL : process.env.GOOGLE_CALLBACK_URL as string,
        EXPRESS_SESSION_SECRATE : process.env.EXPRESS_SESSION_SECRATE as string,
        FRONTEND_URL : process.env.FRONTEND_URL as string,
    }
}

export const envVar = loadEnvVariables();