function reactiveWay(){
    var arr = [1,2,3,4,5,6,7,8];

	Rx.Observable.ofArrayChanges(arr)
	.map (obj => obj.object[obj.index]) //we need to get the value of the array
	
	.filter (number => number %2 ==0)
	.map (number => number * 2)
    
	.subscribe(
        (number) => {
            console.log (number);
        },
        (error) => console.log(error),
        () => console.log("Stream Completed!!!")
    )
	
	arr.push (9);
}

function functionalWay(){
	var arr = [1,2,3,4,5,6,7,8];

	function processArray (arr){
		arr
		.filter (number => number %2 ==0)
		.map (nubmber => number *2)
		.forEach (number => console.log (number))	
	}

	arr.push(9);
	processArray(arr);
}


