var Rx = require('rx');
var rxHelpers = require ("./rx.helpers.node.js");
rxHelpers.initialize(Rx);

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(express.static('public'))
app.use(express.static('files'))
app.use('/data', express.static('public'))


app.post('/getAccountsOfYoungCustomers', function (req, res) {
  
    //var arr = ["a","b","c","d","e","f"]; //these are some valid IDs
    console.log(req.rawBody);
    var arr = req.body.customerIds; //use this format when posting Data: {customerIds: ["a", "b"]}
    var responseArray = [];

    Rx.Observable.fromArray(arr)
    .map(i=> "http://localhost:3000/data/customers/" + i + ".json")
    .httpGet()
    .filter(customer=>customer.age < 30)
    .map(customer => "http://localhost:3000/data/account/" + customer.id + ".json")
    .httpGet()
    .filter(account => account.credits ==0)
    .subscribe(
        oneResult => responseArray.push (oneResult),
        error => console.log(error),
        () => res.send (responseArray)
    )
})

app.listen(3000);
