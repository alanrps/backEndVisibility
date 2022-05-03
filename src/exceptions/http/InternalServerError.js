const HttpException = require('./HttpException');

module.exports = class InternalServerError extends HttpException {

    constructor(errorCode, report) {
        super(500, errorCode);
        this.report = report;
    }
};