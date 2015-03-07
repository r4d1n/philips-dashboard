var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    request({
        url: "https://gateway.api.pcftest.com:9004/v1/oauth2/token?grant_type=client_credentials",
        method: "POST",
        json: true,
        headers: {
            'Authorization': "Basic RFJDWUpFYnFQSUJiMmJOZURlSlcyR3V3QTNDUTFqaHk6cHJQTHIzYjJHRktVVFVacw==",
        },
        //body: JSON.stringify({username: "sam.s.smith", password: "MyFood4Health!"})
    } , function( validateError, validateResponse, validateBody ) {
        //var validationDetails = JSON.parse( validateBody );
        console.log(validateBody);
        //console.log(JSON.stringify({username: "sam.s.smith", password: "MyFood4Health!"}));
        //console.log(validateBody);
    })
    res.render('index', { title: 'Express' });
});

module.exports = router;
