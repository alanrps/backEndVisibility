const HttpException = require('./HttpException');

export class NotFoundException extends HttpException {

    constructor(errorCode, report) {
        super(404, errorCode);
        this.report = report;
    }

}

export default {};
