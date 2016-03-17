$ = {

  ajax: function(options){
    var xml = new XMLHttpRequest();
    //complete callback
    xml.addEventListener( "load", function(event){
      console.log(event.target);
      if(event.target.status >= 200 && event.target.status < 300){
        options.success(event.target, event.target.statusText);
      }
      else{
        options.error(event.target, event.type, event);
      }
    });
    xml.open(options.method, options.url, options.async);
    xml.send();

    //error callback
    // xml.addEventListener( "error", options.error(event.target, event.type, event));
  },

};

options = {

  complete: function(xhrObj, statusString){
    console.log(xhrObj, statusString);
  },

  data: {},

  error: function(xhrObj, errorString, exceptionObj){
    console.log(xhrObj, errorString, exceptionObj);
  },

  headers: {},

  method: "GET",

  success: function(xhrObj, data, statusString){

  },

  url: "http://jsonplaceholder.typicode.com/posts",

  async: true,

};
$.ajax(options);
