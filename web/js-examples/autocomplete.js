function search(value){
    $.get("data/autocomplete.json", function(data, status){
        var dataList = document.getElementById('listOfItems');
        
        data.forEach (item=> {
            var option = document.createElement('option');
            option.value = item.value;
            dataList.appendChild(option);
        });
    })
}

function autoComplete(){
    var textElement = document.getElementById("idText");

    var keyStream = Rx.Observable.fromEvent(textElement, 'input');
    
    keyStream
    .debounce(500)
	.map (input => input.value)
    .subscribe(
        searchString => search (searchString),
        err => console.log('Error: ' + err),
        () =>console.log('Completed') 
    );
}

window.onload = function (){
    autoComplete();
}