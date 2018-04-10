'use strict'; 

module.exports = class HttpException {

    constructor(success, status, name, messsage) { 
        this.success = success;
        this.status = status;
        if (name === "") {
            this.name = this.getStatusCodeDesc(status);
        } else {
            this.name = name;
        }        
        this.messsage = messsage;
    }

    getMessageJson() {
        var msgJson = {
            "success"   : this.success,
            "status"    : this.status,
            "name"      : this.name,
            "messsage"  : this.messsage 
        }

        return msgJson;
    }

    getStatusCodeDesc(status) {
        switch (status) {
            case 400:
                return 'Bad Request';
                break;
            case 422:
                return 'Unprocessable Entity';
                break;
            default:
                break;
        }
    }
      
}
