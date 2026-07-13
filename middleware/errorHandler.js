const appError = require("../utils/AppError.js")

const validationErrorHandler = (error) => {
    const errors = Object.values(error.errors).map(val => val.message);
    const messages = errors.join(', ');
    const errMessage = `Invalid input : ${messages}`;
    return new appError(errMessage, 400);

}
const castErrorHandler = (error) => {
    const errMessage = `Invalid ${error.path} which is : ${error.value}`;
    return new appError(errMessage, 400);
}
const duplicateKeyHandler = (error) => {
    const keys = Object.keys(error.keyValue);
    const values = Object.values(error.keyValue);
    const errMessage = `Duplicate key : ${keys}: ${values}`;
    return new appError(errMessage , 409);



}
const errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") error = validationErrorHandler(error);
    if (error.name === "CastError") error = castErrorHandler(error);
    if (error.code === 11000) error = duplicateKeyHandler(error);
    const statusCode = error.statusCode || 500 ;
    const message = error.message || "Internal Server error"
    res.status(statusCode).json({
    status: "fail" ,
    message: message ,
    data: null 
})
}
module.exports = errorHandler;