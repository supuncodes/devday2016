function tripleClick(){
    var buttonElement = document.getElementById("idButton");
    var buttonStream = Rx.Observable.fromEvent(buttonElement, 'click');
    
    buttonStream
    .bufferWithTimeAndCount(500,3)
    .subscribe(tripleclick => alert ("Awesome!!!"),
        error => {},
        () => {}
    );

}

window.onload = function (){
    tripleClick();
}