const HttpException = require('./HttpException');

module.exports = class UnprocessableEntityException extends HttpException {

    constructor(errorCode, report) {
        super(422, errorCode);

        this.report = report;
    }

};
