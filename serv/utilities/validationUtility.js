const APP_CONSTANTS = require('../constants/appconstants')
module.exports={
    validatePayload:function(data){
        let key = data.key;
        let value = data.value;
        if(key==0||key&&value){
            return APP_CONSTANTS.VALIDATION_SUCCESS;
        }else{
            return APP_CONSTANTS.VALIDATION_FAILURE;
        }
    },
    validateReadPayload:function(data){
        let key = data.key; 
        if(key){
            return APP_CONSTANTS.VALIDATION_SUCCESS;
        }else{
            return APP_CONSTANTS.VALIDATION_FAILURE;
        }
    },
    validateDeletePayload:function(data){
        let key = data.key; 
        if(key){
            return APP_CONSTANTS.VALIDATION_SUCCESS;
        }else{
            return APP_CONSTANTS.VALIDATION_FAILURE;
        }
    }
}