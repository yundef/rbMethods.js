Array.prototype.assoc = function(obj){
    for(var i = 0, l= this.length;i<l;i++){
         if(this[i][0] == obj) return this[i];
    }
    return null;
};

Array.prototype.at = function(pos){
    if(pos < 0){
        return this[this.length + pos];
    }else{
        return this[pos];
    }
};

Array.prototype.choice = function(){
    var i = Math.floor(Math.random() * this.length);
    return this[i];
};

Array.prototype.clear = function(){
    this.splice(0, this.length);
};

Array.prototype.clone = function(){
    return this;
};

Array.prototype.dup = function(){
    return this;
};

Array.prototype.collect = function(f){
    return this.map(f);
};

Array.prototype.compact = function(){
    var result = new Array;
    for(var i = 0, l = this.length; i < l; i++){
        if(this[i] !== null) result.push(this[i]);
    }
    return result;
};

Array.prototype.delete = function(val){
    for(var i = 0, l = this.length; i < l; i++){
        if(this[i] == val) this.splice(i, 1);
    }
    return this;
};

Array.prototype.delete_at = function(pos){
    var i = (pos < 0) ? this.length + pos: pos;
    var result = this[pos];
    this.splice(pos, 1);
    return result;
};

Array.prototype.delete_if = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        if(f(this[i])) this.splice(i, 1);
    }
    return this;
};

Array.prototype.each = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        f(this[i]);
    }
};

Array.prototype.each_index = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        f(i);
    }
};

Array.prototype.fetch = function(pos, ifnone){
    var i = (pos >= 0) ? pos : this.length + pos;
    if(i >= 0 && i < this.length){
        return this[i];
    }else if(arguments.length == 2){
        return ifnone;
    }else{
        var error     = new Error();
        error.name    = 'IndexError';
        error.message = 'index ' + i + ' out of array';
        throw error;
    }
};

Array.prototype.fill = function(p, start, range){
    var x = (arguments.length > 1) ? start : 0;
    var l = (arguments.length > 2) ? Math.min(range, this.length) : this.length;
    for(var i = x; i < l; i++){
         this[i] = (typeof p == 'function') ? p(this[i]) : p;
    }
    return this;
};

Array.prototype.first = function(n){
    if(arguments.length == 1 && n >= 0){
        return this.slice(0, n);
    }else if(arguments.length == 1 && n < 0){
        var error     = new Error();
        error.name    = 'ArgumentError';
        error.message = 'negative array size';
        throw error;
    }else{
        var result = (this.length < 1) ? null : this[0];
        return result;
    }
};

Array.prototype.flatten = function(lv){
    var result = new Array;
    var count = 0;
    var level = lv || Number.MAX_VALUE;
    var parse = function(x){
        if(typeof x == 'object' && count < level){
            count += 1;
            for(var i = 0, l = x.length; i < l; i++){
                parse(x[i]);
            }
        }else{
            result.push(x);
        }
    }
    
    for(var i = 0, l = this.length; i < l; i++){
        count = 0;
        parse(this[i]);
    }
    return result;
};


Array.prototype.include = function(val){
    for(var i = 0, l = this.length; i < l; i++){
        if(this[i] == val) return true;
    }
    return false;
};

Array.prototype.index = function(val){
    for(var i = 0, l = this.length; i < l; i++){
        if(typeof val == 'function'){
            if(val(this[i]) === true) return i;
        }else{
            if(this[i] == val) return i;
        }
    }
    return null;
};

Array.prototype.insert = function(nth){
    var pos = (nth >= 0) ? nth : this.length + nth + 1;
    for(var i = 1, l = arguments.length; i < l; i++){
        this.splice(pos, 0, arguments[i]);
        pos += 1;
    }
    return this;
};

Array.prototype.insert = function(nth){
    var pos = (nth >= 0) ? nth : this.length + nth + 1;
    for(var i = 1, l = arguments.length; i < l; i++){
        this.splice(pos, 0, arguments[i]);
        pos += 1;
    }
    return this;
};

Array.prototype.inspect = function(){
    var parse = function(x){
        if(typeof x == 'object'){
            var temp = new Array;
            for(var i = 0, l = x.length; i < l; i++){
                temp.push(parse(x[i]));
            }
            return '[' + temp.join(', ') + ']';
        }else{
            var s = (typeof x == 'string') ? '"' + x + '"' : x;
            return s;
        }
    }
    result = parse(this);
    return result;
};

Array.prototype.last = function(n){
    if(arguments.length == 1 && n >= 0){
        return this.slice(Math.max(this.length - n, 0));
    }else if(arguments.length == 1 && n < 0){
        var error     = new Error();
        error.name    = 'ArgumentError';
        error.message = 'negative array size';
        throw error;
    }else{
        var result = (this.length < 1) ? null : this[this.length - 1];
        return result;
    }
};

Array.prototype.size = function(){
    return this.length;
};

Array.prototype.nitems = function(f){
    var count = 0;
    if(arguments.callee == 1){
        for(var i = 0, l = this.length; i < l; i++){
            if(f(this[i]) !== null) count += 1;
        }
    }else{
        for(var i = 0, l = this.length; i < l; i++){
            if(this[i] !== null) count += 1;
        }
    }
    return count;
};

Array.prototype.product = function(lists){
    var result = new Array;
    var materials = new Array;
    var materialSizes = new Array;
    var cursors = [0];
    materials.push(this);
    materialSizes.push(this.length);
    var resultSize = this.length;
    for(var i = 0, l = arguments.length; i < l; i++){
        materials.push(arguments[i]);
        materialSizes.push(arguments[i].length);
        resultSize *= arguments[i].length;
        cursors.push(0);
    }
    
    var moveCursors = function(target){
        if(cursors[target] == materialSizes[target] - 1){
            cursors[target] = 0;
            moveCursors(target - 1);
        }else{
            cursors[target] += 1;
        }
    }
    
    for(var i = 0, l = resultSize; i < l; i++){
        var element = new Array;
        for(var j = 0, m = materials.length; j < m; j++){
            element.push(materials[j][cursors[j]]);
        }
        moveCursors(materials.length - 1);
        result.push(element);
    }
    
    return result;
};

Array.prototype.rassoc = function(obj){
    for(var i = 0, l= this.length;i<l;i++){
         if(this[i][1] == obj) return this[i];
    }
    return null;
};

Array.prototype.reverse_each = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        f(a[l - 1 - i]);
    }
};

Array.prototype.rindex = function(val){
    var result = null;
    
    if(typeof val == 'function'){
        for(var i = 0, l = this.length; i < l; i++){
           if(val(this[i])) result = i;
        }
    }else{
        for(var i = 0, l = this.length; i < l; i++){
            if(this[i] == val) result = i;
        }
    }
    return result;
};

Array.prototype.shuffle = function(val){
    var result = new Array;
    var index = new Array;
    for(var i = 0, l = this.length; i < l; i++){
        index.push(i);
    }
    while(index.length > 0){
        var target = Math.floor(Math.random() * index.length);
        result.push(this[index[target]]);
        index.splice(target, 1);
    }
    
    return result;
};

Array.prototype.to_a = function(){
    return this;
};

Array.prototype.to_ary = function(){
    return this;
};

Array.prototype.to_s = function(){
    return this.join('');
};

Array.prototype.transpose = function(){
    if(this.length == 0){
        return new Array;
    }else if(!this[0].length){
        var error     = new Error();
        error.name    = 'TypeError';
        error.message = 'can\'t convert Fixnum into Array';
        throw error;
    }
    
    var result = new Array;
    for(var i = 0, l = this[0].length; i < l; i++){
        var row = new Array;
        for(var j = 0, m = this.length; j < m; j++){
            row.push(this[j][i]);
        }
        result.push(row);
    }
    
    return result;
};

Array.prototype.uniq = function(){
    var o = new Object;
    var result = new Array;
    for(var i = 0, l = this.length; i < l; i++){
        var e = this[i];
        if(!(e in o) || o[e].indexOf(typeof this[i]) == -1){
            o[e] += typeof e;
            result.push(e);
        }
    }
    
    return result;
};

Array.prototype.values_at = function(selectors){
    var result = new Array;
    for(var i = 0, l = arguments.length; i < l; i++){
        var pos = arguments[i];
        pos = (pos < 0) ? this.length + pos : pos;
        result.push(this[pos] || null);
    }
    
    return result;
};

Array.prototype.zip = function(lists){
    var result = new Array;
    for(var i = 0, l = this.length; i < l; i++){
        var e = new Array;
        e.push(this[i]);
        for(var j = 0, m = arguments.length; j < m; j++){
            e.push(arguments[j][i] || null);
        }
        result.push(e);
    }
    
    return result;
};