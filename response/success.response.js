'use strict';

const { ReasonPhrases, StatusCodes } = require('../constants/httpStatusCodes');

class SuccessResponse {
    constructor({ message, status = StatusCodes.OK, responseMessage = ReasonPhrases.OK, metadata = {} }) {
        this.message = !message ? responseMessage : message;
        this.status = status;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessResponse {
    constructor({ message, status = StatusCodes.CREATED, responseMessage = ReasonPhrases.CREATED, metadata }) {
        super({ message, status, responseMessage, metadata });
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessResponse,
};