
class response {
    constructor(status, message, body) {
        this.status = status;
        this.message = message;
        this.body = body;
    }
}

module.exports = response;