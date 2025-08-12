"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
// Handle Zod Error
const handleZodError = (err) => {
    const errorSourse = [];
    let errors = err.issues;
    errors.forEach((issues) => {
        errorSourse.push({
            path: issues.path[issues.path.length - 1],
            // path : issues.path.length > 1 && issues.path.reverse().join(" include ")
            message: issues.message
        });
    });
    ;
    return {
        statusCode: 400,
        message: "Zod Error",
        errorSourse
    };
};
exports.handleZodError = handleZodError;
