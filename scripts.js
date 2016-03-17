var Promise = (function() {

  return function(typ, trg){
    this.callbacks = {};

    this.type = typ || 'fx';
    this.target = trg;
    var that = this;
    this.fire = function(fncName, argArray){
      if(that.callbacks[fncName] !== undefined){
        that.callbacks[fncName].apply(trg, argArray);
      }
    };
    this.done = function(callback){
      that.callbacks.done = callback;
    };
    this.fail = function(callback){
      that.callbacks.fail = callback;
    };
    this.always = function(callback){
      that.callbacks.always = callback;
          console.log('I got called');
    };
  };//close promise return

})();

var $ = (function(Promise) {

  var xml = new XMLHttpRequest();

  var ajax = function(options){
    var promise = new Promise("fx", xml);
    var returnValue;

    xml.addEventListener( "load", function(event){
      options.complete(event.target, event.target.statusText);
      promise.fire("always", [event.target, event.target.statusText]);

      if(event.target.status >= 200 && event.target.status < 300){
        options.success(event.target, event.target.responseText, event.target.statusText);
        promise.fire("done", [event.target, event.target.responseText, event.target.statusText]);
      }
      else{
        options.error(event.target, event.type, event);
        promise.fire("fail", [event.target, event.type, event]);
      }

    });
    xml.open(options.method, options.url, options.async);
    if (options.headers !== {}) {
      headerKey = Object.keys(options.headers)[0];
      xml.setRequestHeader(headerKey, options.headers[headerKey]);
    }
    xml.send();
    return promise;
  };

  var get = function(url, data, callback) {
    options.url = url;
    options.data = data;
    options.method = 'GET';
    var event = ajax(options);
    xml.onload = callback(event);
  };

  var post = function(url, data, callback) {
    options.url = url;
    options.data = data;
    options.method = 'POST';
    var event = ajax(options);
    xml.onload = callback(event);
  };

  return {
    ajax: ajax,
    get: get,
    post: post
  };

})(Promise);

var options = (function() {
  var complete = function(xhrObj, statusString){
    console.log('Complete: ' + xhrObj, statusString);
  };

  var data = {};

  var error = function(xhrObj, errorString, exceptionObj){
    console.log('Error: ' + xhrObj, errorString, exceptionObj);
  };

  var headers = {};

  var method = "POST";

  var success = function(xhrObj, data, statusString){
    console.log('Success: ' + xhrObj, data, statusString);
  };
  var url = "http://jsonplaceholder.typicode.com/posts";
  var async = true;

  return {
    complete: complete,
    data: data,
    error: error,
    headers: headers,
    method: method,
    success: success,
    url: url,
    async: async
  };

})();



$.ajax(options).done(function(a,b,c){console.log(a,b,c);});
