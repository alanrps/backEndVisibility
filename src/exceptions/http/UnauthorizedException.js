const HttpException = require('./HttpException');

module.exports = class UnauthorizedException extends HttpException {

    constructor(errorCode, report) {
        super(401, errorCode);
        this.report = report;
    }

};
