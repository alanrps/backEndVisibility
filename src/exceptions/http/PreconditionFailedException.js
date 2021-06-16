const HttpException = require('./HttpException');

module.exports = class PreconditionFailedException extends HttpException {

    constructor(errorCode, report) {
        super(412, errorCode);
        this.report = report;
    }

};
