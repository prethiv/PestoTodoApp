const { Level } = require('level')
const db = new Level('db')
const CONSTANTS = require('../constants/appconstants');

module.exports = {
    createEntity: function (key, value) {
        db.put(key, value, (err) => {
            if (err) {
                return CONSTANTS.DATABASE_STORE_ERR;
            } else {
                return CONSTANTS.DATABASE_INSERTION_SUCCESS;
            }
        })
    },
    readEntity: async function (key,res) {
        let val = db.get(key, (err, val) => {
            if (err) {
                res.json({
                    value:CONSTANTS.DATABASE_READ_ERR
                },200); 
            }else{
                res.json({
                    value:val
                },200);
            }
        });
    },
    deleteEntity: function (key,res) {
        db.del(key, (err) => {
            if (err) {
                return CONSTANTS.DATABASE_DELETE_ERR;
            }else{
                res.json({
                    value:CONSTANTS.DATABASE_DELETE_SUCCESS
                },200);
                
            }
        })
    }
}

