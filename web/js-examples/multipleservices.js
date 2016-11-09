function callingMultipleServices (){
    var arr = ["a","b","c","d","e","f"];
    var responseArray = [];

    Rx.Observable.fromArray(arr)
    .map(i=> "data/customers/" + i + ".json")
    .httpGet()
    .filter(customer=>customer.age < 30)
    .map(customer => "data/account/" + customer.id + ".json")
    .httpGet()
    .filter(account => account.credits ==0)
    .subscribe(
        oneResult => responseArray.push (oneResult), //push each element to the response array
        error => console.log(error),
        () => console.log (responseArray)
    )
}


window.onload = function (){
    callingMultipleServices();
}