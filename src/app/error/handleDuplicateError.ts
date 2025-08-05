// Mongoose Duplicate Error handle
export const handleDuplicateError = (err: any) => {
    let duplicate = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${duplicate[1]} already exist!`
    }
};