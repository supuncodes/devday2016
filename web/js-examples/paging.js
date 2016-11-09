function pagingExample(){
    
    var firstPage = Rx.Observable.just (1);
    var emitter1 = new RxHelpers.ItemEmitter();

    var stream1 = Rx.Observable.fromItemEmitter(emitter1);

    firstPage
    .merge(stream1)
    .subscribe(
        (a)=>{ console.log (a) },
        (b)=>{ },
        ()=>{ }
    );

}
