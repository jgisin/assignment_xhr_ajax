var $ = (function() {
  var xml = new XMLHttpRequest();

  var ajax = function(options){
    var returnValue;
    
    xml.addEventListener( "load", function(event){
      options.complete(event.target, event.target.statusText);

      if(event.target.status >= 200 && event.target.status < 300){
        options.success(event.target, event.target.responseText, event.target.statusText);
        returnValue = promise('fx', event.target);
      }
      else{
        options.error(event.target, event.type, event);
      }
      
    });
    xml.open(options.method, options.url, options.async);
    if (options.headers !== {}) {
      headerKey = Object.keys(options.headers)[0];
      xml.setRequestHeader(headerKey, options.headers[headerKey]);
    }
    xml.send();
    return promise('fx', xml);
  };

  var get = function(url, data, callback) {
    options.url = url;
    options.data = data;
    options.method = 'GET';
    promise = ajax(options);
    xml.onload = callback(promise.target);
  };

  var post = function(url, data, callback) {
    options.url = url;
    options.data = data;
    options.method = 'POST';
    promise = ajax(options);
    xml.onload = callback(promise.target);
  };

  return {
    ajax: ajax,
    get: get,
    post: post
  }

})();

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
  }

})();

var promise = (function(type, target) {
  var type = type || 'fx';
  var target = target;

  var done = function() {
    console.log('I got called');
  };

  return {
    target: target,
    done: done,
  }
})();

$.post(options.url, options.data, function(event) {console.log('Callback: ' + event)});
