const HttpException = require('./HttpException');

module.exports = class NotFoundException extends HttpException {

    constructor(errorCode, report) {
        super(404, errorCode);
        this.report = report;
    }

};
