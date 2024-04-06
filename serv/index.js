const express = require('express');
const app = express();
const db_utility = require('./utilities/databaseUtilities');
let bodyParser = require('body-parser');
const { DATABASE_STORE_ERR, RETRY_CONSTANT, VALIDATION_SUCCESS, VALIDATION_FAILURE, DATABASE_INSERTION_SUCCESS, DATABASE_READ_ERR, DATABASE_DELETE_ERR } = require('./constants/appconstants');
const validation = require('./utilities/validationUtility');
const  cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())
app.post('/createEntity', (req, res) => {
    console.log(req.body);
    let todo_item = req.body;
    let validation_code = validation.validatePayload(todo_item);
    if (validation_code === VALIDATION_SUCCESS) {
        let code = DATABASE_STORE_ERR;
        let tries = 1;
        while (code == DATABASE_STORE_ERR && tries < RETRY_CONSTANT) {
            code = db_utility.createEntity(todo_item.key, todo_item.value);
            tries++;
        }
        res.json({
            msg:DATABASE_INSERTION_SUCCESS
        },200);
    }else{
        res.json({
            msg:VALIDATION_FAILURE
        },500);
    }
});

app.post('/readEntity', (req, res) => {
    console.log(req.body);
    let todo_item = req.body;
    let validation_code = validation.validateReadPayload(todo_item);
    if (validation_code === VALIDATION_SUCCESS) {
        let codeOrValue = DATABASE_READ_ERR;
        let tries = 1;
        while (codeOrValue == DATABASE_READ_ERR && tries < RETRY_CONSTANT) {
            codeOrValue =db_utility.readEntity(todo_item.key,res);
            tries++;
        }
    }else{
        res.json({
            msg:VALIDATION_FAILURE
        },500);
    }
});


app.post('/deleteEntity', (req, res) => {
    console.log(req.body);
    let todo_item = req.body;
    let validation_code = validation.validateDeletePayload(todo_item);
    if (validation_code === VALIDATION_SUCCESS) {
        let codeOrValue = DATABASE_DELETE_ERR;
        let tries = 1;
        while (codeOrValue == DATABASE_DELETE_ERR && tries < RETRY_CONSTANT) {
            codeOrValue = db_utility.deleteEntity(todo_item.key,res);
            tries++;
        }
    }else{
        res.json({
            msg:VALIDATION_FAILURE
        },500);
    }
});

app.get('/allItems',(req,res)=>{
    db_utility.allItems(res);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
