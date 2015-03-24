var express = require('express');
var router = express.Router();
var request = require('request');
var accessToken;
var users = {
    "sam.s.smith" : {pwd : "MyFood4Health!", patientId : "a101"},
    "nancy.anderson" : {pwd : "OneHabit,2beU", patientId : "a102"},
    "charlie.miller" : {pwd : "1ce.Upon.a.Time", patientId : "a103"},
    "mark.taylor" : {pwd : "Going4ther$", patientId : "a104"},
    "karen.young" : {pwd : "What1This?", patientId : "a105"}
    }
var fs = require('fs');

function token(uname, pwd, fn) {
    request({
        url: "https://gateway.api.pcftest.com:9004/v1/oauth2/token?grant_type=client_credentials",
        method: "POST",
        json: true,
        headers: {
            'Authorization': "Basic RFJDWUpFYnFQSUJiMmJOZURlSlcyR3V3QTNDUTFqaHk6cHJQTHIzYjJHRktVVFVacw==",
        },
    } , function( validateError, validateResponse, validateBody ) {
        accessToken = validateBody.access_token
        request({
            url: "https://gateway.api.pcftest.com:9004/v1/oauth2/authorize/login",
            method: "POST",
            json: true,
            headers: {
                'Authorization': "Bearer " + accessToken,
            },
            body: {username: uname, password: pwd}
        } , function( validateError, validateResponse, validateBody ) {
            fn(validateError, validateResponse, validateBody);
        })


    })
}
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

/* GET home page. */
router.get('/raw/patient', function(req, res, next) {
    var uname = req.param('username');
    console.log(users[uname].pwd);
    token(uname, users[uname].pwd, function( validateError, validateResponse, validateBody ) {
        var user = validateBody
        console.log(validateBody);
        request({
            url: "https://gateway.api.pcftest.com:9004/v1/fhir_rest/Patient/" + users[uname].patientId,
            method: "GET",
            json: true,
            headers: {
                'Authorization': "Bearer " + accessToken,
            },
            //body: {username: "sam.s.smith", password: "MyFood4Health!"}
        } , function( validateError, validateResponse, validateBody ) {
            var patient = validateBody
            console.log(patient);
            res.json(patient);
        })
    })
});

router.get('/raw/observation', function(req, res, next) {
    var uname = req.param('username');
    var code = req.param('code');
    console.log(users[uname].pwd);
    token(uname, users[uname].pwd, function( validateError, validateResponse, validateBody ) {
        var user = validateBody
        var endpoint = "https://gateway.api.pcftest.com:9004/v1/fhir_rest/Observation/?subject:_id=" + users[uname].patientId + "&_count=50&_sort:desc=date";
        if (code) {
            endpoint = endpoint + "&name=" + code;
        }
        console.log(validateBody);
        request({
            url: endpoint,
            method: "GET",
            json: true,
            headers: {
                'Authorization': "Bearer " + accessToken,
            },
            //body: {username: "sam.s.smith", password: "MyFood4Health!"}
        } , function( validateError, validateResponse, validateBody ) {
                var observations = validateBody
                var entry = observations.entry
                var re = {}
                for (i = 0; i < entry.length; i++) {
                    //console.log(entry[i]["content"]["appliesDateTime"]);
                    //console.log(entry[i]["content"]["valueQuantity"]["value"] + " " + entry[i]["content"]["valueQuantity"]["units"]);
                    //re[entry[i]["content"]["appliesDateTime"]] = entry[i]["content"]["valueQuantity"]["value"] + " " + entry[i]["content"]["valueQuantity"]["units"];
                }
                res.json(observations);
        })
    })
});

router.get('/data/o2', function(req, res, next) {
    fs = require('fs')
    fs.readFile('SPO2.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
        var json = JSON.parse(data);
        res.json({ "o2" : json });
    });

});

router.get('/data/temp', function(req, res, next) {
    fs = require('fs')
    fs.readFile('temp.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var json = JSON.parse(data);
        res.json({"temp" : json});
    });

});

router.get('/data/hr', function(req, res, next) {
    fs = require('fs')
    fs.readFile('hr.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var json = JSON.parse(data);
        res.json({"hr": json});
    });

});

module.exports = router;
