const { Level } = require('level')
const db = new Level('db')
const CONSTANTS = require('../constants/appconstants');

module.exports = {
    createEntity: function (key, value,prog) {
        db.put(key, value+" => "+prog, (err) => {
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
    },
    allItems:async function(res){
        let result = [];
        for await (const [key, value] of db.iterator({ gt: -1 })) {
            console.log('Key:', key, 'Value:', value);
            result.push({
                key,value
            });
        }
        res.json(result);
    },
    clearAllItems:async function (res){
        db.clear();
        res.json({
            msg:CONSTANTS.VALIDATION_SUCCESS
        },200);
    }
}

