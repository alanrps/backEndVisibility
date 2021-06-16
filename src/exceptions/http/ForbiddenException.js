const HttpException = require('./HttpException');

module.exports = class ForbiddenException extends HttpException {

    constructor(errorCode, report) {
        super(403, errorCode);
        this.report = report;
    }

};
