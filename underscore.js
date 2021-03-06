var _  = {};

(function() {
  // Baseline setup
  this._ = _;
  
  /*
    Input     : array, n [optional]
    Output    : first n elements of array
    *** This one is done for you ***
  */
  _.first = function(array, n) {
    n = n || 1;
    return array.slice(0, n);
  };

  /*
    Input     : array, n [optional]
    Output    : last n elements of array
  */
  _.last = function(array, n) {
    n = n || 1;
    if(n<0) {
      return array.slice(-n,array.length);
    }
    return array.slice(array.length-n, array.length);
  };

  /*
    Input     : collection, callback
    Output    : No Output
    Function  : call iterator(value, key, collection) on each elements
    Tips      : Array.isArray(collection) will return a boolean value for if collection is an array
  */
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){
      for( var i=0;i<collection.length;i++){
        iterator(collection[i],i);
      }
    }else if(typeof collection === "object"){
      for( keys in collection) {
          iterator(collection[keys],keys,collection);
      }
    }
  };

  /*
    Input     : collection, target
    Output    : index (or -1)
    Function  : return first index where value equals target
  */
  _.indexOf = function(collection, target) {
    if(Array.isArray(collection)){
      var match = false;
      for(var index = 0; index < collection.length; index++){
        if(collection[index] === target) {
          match = true;
          return index;
        }
      }
      if(!match) {
        return index = -1;
      }

    }else if (typeof collection === "object") {
      for (keys in collection) {
        if(collection[keys] === target) {
          return keys;
        }
      }
    }
  };

  /*
    Input     : collection, test
    Output    : collection of elements that passes test(value, index/key)
  */
  _.filter = function(collection, test) {
    var pass = [];
    var passObject = {};
   if(Array.isArray(collection)){
      for( var i=0;i<collection.length;i++) {
        if(test(collection[i],i)) {
          pass.push(collection[i]);
        }
      }
        return pass;
    }else if(typeof collection === "object") {
      for( keys in collection) {
        if(test(collection[keys],keys)) {
          passObject[keys]=collection[keys];
        }
      }
      return passObject;
    } 
  };

  /*
    Input     : collection, test
    Output    : collection without elements that passes test(value, index/key)
  */
  _.reject = function(collection, test) {
    //Try to re-use _.filter
    var pass = [];
    var passObject = {};
   if(Array.isArray(collection)){
      for( var i=0;i<collection.length;i++) {
        if(!test(collection[i],i)) {
          pass.push(collection[i]);
        }
      }
        return pass;
    }else if(typeof collection === "object") {
      for( keys in collection) {
        if(!test(collection[keys],keys)) {
          passObject[keys]=collection[keys];
        }
      }
      return passObject;
    } 
  };

  /*
    Input     : collection, callback, accumulator
    Output    : accumulated value
    Function  : Reduces an array or object to a single value by repetitively calling
                iterator(previousValue, item) for each item. previousValue should be
                the return value of the previous iterator call.
  */
  _.reduce = function(collection, iterator, accumulator) {
    if(accumulator === undefined) {
      accumulator = 0;
    }
    var current = accumulator;
    if(Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        current = iterator(current,collection[i]);
      }
      return current;
    }else if (typeof collection === "object") {
      for ( key in collection) {
        accumulator +=collection[key];
        current = iterator(current,collection[key]);
      }
      return current;
    }
    accumulator += current;
  };

  /*
    Input     : collection, callback
    Output    : collection
    Function  : Produces a new collections by mapping each value in list through
                a transformation function (iterator). The iterator is passed three 
                arguments: the value, then the index (or key) of the iteration, 
                and finally a reference to the entire list.
  */
  _.map = function(collection, iterator) {
    var modifiedCollection =[];
    var modifiedCollectionObject= {};
    if(Array.isArray(collection)) {
      for( var i = 0 ; i < collection.length; i++) {
        modifiedCollection.push(iterator(collection[i],i,collection));
      }
      return modifiedCollection;

    }else if(typeof collection === "object") {
      for( keys in collection) {
        modifiedCollectionObject[keys] = iterator(collection[keys],keys,collection);
      }
      return modifiedCollectionObject;
    }
  };

  /*
    Input     : array
    Output    : array of only unique values
  */
  _.uniq = function(array) {
    //Try using reduce for extra credits [optional]
    var unique = [];
    var exist = false;
    unique.push(array[0]);
    for( var i = 0 ; i<array.length;i++) {
      unique.push(_.reduce(unique,function(a,b) {if(a != b) {return a;}},array[i]));
    }
    
    for(var j = 0 ; j<unique.length;j++) {
      if(unique[j] === undefined) {
        unique.splice(j,1);
        j--;
      }
    }
    return unique;
  };

  /*
    Input     : collection, test
    Output    : boolean if all element passes test(value)
  */
  _.every = function(collection, test) {
    //Try using reduce for extra credits [optional]
    var check = true;
    if(Array.isArray(collection)){
      for(var i = 0; i<collection.length; i++) {
        if(!test(collection[i])) {
          return check = false;
        }
      } 
    }else if(typeof collection === "object") {
      for( keys in collection) {
        if(!test(collection[keys])) {
          return check = false;
        }
      }
    }
    return check;
  };

  /*
    Input     : collection, test
    Output    : boolean if some element passes test(value)
  */
  _.some = function(collection, test) {
    //Try using every for extra credits [optional]
    var check = false;
    if(Array.isArray(collection)){
      for(var i = 0; i<collection.length; i++) {
        if(test(collection[i])) {
          return check = true;
        }
      } 
    }else if(typeof collection === "object") {
      for( keys in collection) {
        if(test(collection[keys])) {
          return check = true;
        }
      }
    }
    return check;
  };

  /*
    Input     : collection, functionOrKey, args
    Output    : collection where each element is a result of functionOrKey(args)
                where element is the context of functionOrKey
    Tips      : Reach about .apply. The standward way to invoke function with context binding is
                fn.apply(context, arguments);
   */
  _.invoke = function(collection, functionOrKey, args){
    //Try using map
      var process = [];
      var processObject = {};
    
    if(Array.isArray(collection)) {
      for(var i=0; i<collection.length;i++) {
        process.push(functionOrKey.apply(collection[i],Array.prototype.slice.call(arguments,2)));
      }
      return process;
    }else if(typeof collection === "object" && typeof functionOrKey === 'string' ) {
      for(keys in collection) {
        processObject[keys] = collection[keys][functionOrKey].apply(collection[keys],Array.prototype.slice.call(arguments,2));
      }
      return processObject;
      
    }
  };

  /*
    Input     : object1, object2, object3, ...
    Output    : one object with all keys combined, older key will be overwritten by newer keys
   */
  _.extend = function(obj){
    var combined = {};
    for( var i = 0 ; i<arguments.length; i++) {
      for( keys in arguments[i]) {
        combined[keys] = arguments[i][keys];
      }
    }
    return combined;
  };


  /*
    Input     : object1, object2, object3, ...
    Output    : one object with all keys combined, older key will not be overwritten
   */
  _.defaults = function(obj){
    var combined = {};
    for ( var i = 0; i<arguments.length; i++) {
      for (keys in arguments[i]) {
        if(! combined.hasOwnProperty(keys)) {
          combined[keys] = arguments[i][keys];
        }
      }
    }
    return combined;
  };

  ///////////////////////////////////////////////////////////////////////////
  //////////////////////////  Function Decorators  //////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  /*
    Input     : function
    Output    : a function a will only invoked once
    Description : This one is completed for you as an example
   */
  _.once = function(fn){
    //These are closure variables to store state of the return function
    //These are only assessible to the return funciton
    var alreadyCalled = false;
    var result;

    //Return a function that wraps around input function
    return function(){
      //Invoke input function if not already called
      if(!alreadyCalled){
        result = fn.apply(this, arguments);
        alreadyCalled = true;
      }
      //return result
      return result;
    }
  };
  /*
    Input     : funciton
    Output    : a function that will remember if it has already compute the result for 
                a given input. If so, it will return the memoized result. Otherwise, it
                will compute the result, memoize the result for future, and return the result
    Tips      : assume only a single argument will be passed in to fn.
   */
  _.memoize = function(fn){
      var alreadyCalled = false;
      var result;
      if(alreadyCalled) {
        return result;
      }
      return function() {
        if(!alreadyCalled) {
          result = fn.apply(this,arguments);
          alreadyCalled = true;
        }
          return result;
      }

  };
  

}.call(this));
