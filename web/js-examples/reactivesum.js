function reactiveSum(){
    var textElement1 = document.getElementById("idNum1");
    var textElement2 = document.getElementById("idNum2");
    var valueElement = document.getElementById("idTotal");

    var firstStream1 = Rx.Observable.just (parseInt(textElement1.value));
    var firstStream2 = Rx.Observable.just (parseInt(textElement1.value));

    var textStream1 = Rx.Observable.fromEvent(textElement1, 'input').map(x=> parseInt(x.target.value));
    var textStream2 = Rx.Observable.fromEvent(textElement2, 'input').map(x=> parseInt(x.target.value));

    var stream1 = firstStream1.merge(textStream1); 
    var stream2 = firstStream2.merge(textStream2);

    stream1
    .combineLatest(stream2, (v1, v2) => v1+ v2)
    .subscribe(
        function (value) { 
            valueElement.innerHTML = "Total : " + value;
         },
        function (e) { console.log('Error: ' + e); },
        function () { console.log('Completed'); }
    );

}

window.onload = function (){
    reactiveSum();
}