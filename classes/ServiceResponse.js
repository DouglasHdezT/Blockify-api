class ServiceResponse { 
    constructor(status=false, content) { 
        this.status = status; 
        this.content = content;
    }
}

module.exports = ServiceResponse;