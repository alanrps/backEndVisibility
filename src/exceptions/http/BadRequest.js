const HttpException = require('./HttpException');

module.exports = class BadRequest extends HttpException {

    constructor(errorCode, report) {
        super(400, errorCode);
        this.report = report;
    }

};
