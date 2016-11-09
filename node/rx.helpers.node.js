var request = require('request');

function initialize (Rx){
    Rx.Observable.prototype.httpGet = function (obs2){
        var source = this;
        
        var httpComponent = (function (){
            var obs;
            var requestQueue = [];

            var isDownloading = false;
            function downloadHttp(r){
                isDownloading = true;

                
                request(r, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        if (response.headers["content-type"] === "application/json")
                            body = JSON.parse(body);
                        obs.onNext(body);    
                    } else 
                        obs.onNext({});

                    isDownloading = false;
                    next();
                })

            }

            function next(){
                if (!isDownloading){
                    var req = requestQueue.shift();
                    if (req){
                        if (req.isEnd)
                            obs.onCompleted();
                        else
                            downloadHttp(req.data)
                    }
                }
            }

            function processHttp(r){
                requestQueue.push (r);
                next();
            }

            return {
                setObserver: function(o){
                    obs =o;
                },
                sendRequest: processHttp,
                triggerComplete: function(){
                    
                }
            }  
        })();

        return Rx.Observable.create(function(newObserver){
            
            httpComponent.setObserver(newObserver);
            
            return source.subscribe(
                (n)=>{
                    httpComponent.sendRequest({data : n}); 
                },
                (e)=>{ newObserver.onError(e); },
                ()=>{ httpComponent.sendRequest({isEnd: true}); }
            );
            
        });

    };
    var source = this;

    var httpComponent = (function (){
        var obs;
        var requestQueue = [];

        var isDownloading = false;
        function downloadHttp(r){
            isDownloading = true;
            $.get(r, function(data, status){
                obs.onNext(data);
                isDownloading = false;
                next();
            })

        }

        function next(){
            if (!isDownloading){
                var req = requestQueue.shift();
                if (req){
                    if (req.isEnd)
                        obs.onCompleted();
                    else
                        downloadHttp(req.data)
                }
            }
        }

        function processHttp(r){
            requestQueue.push (r);
            next();
        }

        return {
            setObserver: function(o){
                obs =o;
            },
            sendRequest: processHttp,
            triggerComplete: function(){
                
            }
        }  
    })();
}

exports.initialize = initialize;