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
    } , function( validateError, validateResponse, validateBody ) {
        var accessToken = validateBody.access_token
        console.log(accessToken);
        request({
            url: "https://gateway.api.pcftest.com:9004/v1/oauth2/authorize/login",
            method: "POST",
            json: true,
            headers: {
                'Authorization': "Bearer " + accessToken,
            },
            body: {username: "sam.s.smith", password: "MyFood4Health!"}
        } , function( validateError, validateResponse, validateBody ) {
            var user = validateBody
            console.log(validateBody);
            res.json(user);
            
        })
    })
    
});

module.exports = router;
