Array.prototype.forEach = function(fn){
  var _this = this;
  for (var k = 0, length = this.length; k < length; k++) {
    fn(this[k],k,this)
    console.log('11');
  }
  return {
    end:function(fn){
      fn(_this);
      console.log('22');
    }
  };
}

var d = [1,2,3];
d.forEach((v,i,a)=>{ console.log(v)}).end(function(arr){console.log(arr)})
