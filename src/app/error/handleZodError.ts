import { IErrorSourse } from "../interfaces/errorTypes";

// Handle Zod Error
export const handleZodError = (err: any) => {
    const errorSourse: IErrorSourse[] = []
    let errors = err.issues
    errors.forEach((issues: any) => {
        errorSourse.push({
            path: issues.path[issues.path.length - 1],
            // path : issues.path.length > 1 && issues.path.reverse().join(" include ")
            message: issues.message
        })
    });;
    return {
        statusCode: 400,
        message: "Zod Error",
        errorSourse
    }
}